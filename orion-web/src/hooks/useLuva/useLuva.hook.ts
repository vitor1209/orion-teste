import {
    useCallback,
    useSyncExternalStore,
} from "react"

export type Nota =
    | "C"
    | "C#"
    | "D"
    | "D#"
    | "E"
    | "F"
    | "F#"
    | "G"
    | "G#"
    | "A"
    | "A#"
    | "B"

export type NotaType = {
    nota: Nota
}

type EstadoLuva = {
    estado: NotaType | null
    conectado: boolean
    luva: Luva | null
}

type FiltroLuva = {
    usbVendorId?: number
    usbProductId?: number
}

class LuvaStore {
    private listeners = new Set<() => void>()

    private estado: EstadoLuva = {
        estado: null,
        conectado: false,
        luva: null,
    }

    private notificiar() {
        for (const listener of this.listeners) {
            listener()
        }
    }

    subscribe = (listener: () => void) => {
        this.listeners.add(listener)

        return () => {
            this.listeners.delete(listener)
        }
    }

    getSnapshot = () => {
        return this.estado
    }

    private atualizar(
        alteracoes: Partial<EstadoLuva>,
    ) {
        this.estado = {
            ...this.estado,
            ...alteracoes,
        }

        this.notificiar()
    }

    async conectar() {
        if (this.estado.luva) {
            return
        }

        console.log("Luva: iniciando conexão...")

        await this.desconectar()

        const NOTAS_VALIDAS: Nota[] = [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
        ]

        const isNotaValida = (
            valor: unknown,
        ): valor is Nota => {
            return (
                typeof valor === "string" &&
                NOTAS_VALIDAS.includes(valor as Nota)
            )
        }

        const luva = new Luva({}, (linha) => {
            try {
                const dados = JSON.parse(linha)

                if (
                    dados &&
                    isNotaValida(dados.nota)
                ) {
                    console.log(
                        "Luva: nota recebida",
                        dados,
                    )

                    this.atualizar({
                        estado: dados as NotaType,
                    })
                } else {
                    console.warn(
                        "Nota inválida recebida da luva:",
                        dados,
                    )
                }
            } catch (erro) {
                console.error(
                    "Erro ao parsear JSON da luva:",
                    linha,
                    erro,
                )
            }
        })

        this.atualizar({
            luva,
        })

        const sucesso = await luva.conectar()

        console.log(
            "Luva: conexão result:",
            sucesso,
        )

        if (!sucesso) {
            this.atualizar({
                luva: null,
                conectado: false,
            })

            return
        }

        this.atualizar({
            conectado: true,
        })
    }

    async desconectar() {
        const luva = this.estado.luva

        if (!luva) {
            return
        }

        console.log("Luva: desconectando...")

        await luva.desconectar()

        this.atualizar({
            luva: null,
            conectado: false,
            estado: null,
        })
    }
}

const luvaStore = new LuvaStore()

export const useLuva = () => {
    const snapshot = useSyncExternalStore(
        luvaStore.subscribe,
        luvaStore.getSnapshot,
        luvaStore.getSnapshot,
    )

    const conectar = useCallback(() => {
        return luvaStore.conectar()
    }, [])

    const desconectar = useCallback(() => {
        return luvaStore.desconectar()
    }, [])

    return {
        conectar,
        desconectar,
        estado: snapshot.estado,
        conectado: snapshot.conectado,
    }
}

class Luva {
    private filtro: FiltroLuva
    private porta: SerialPort | null = null
    private conectado = false
    private reader: ReadableStreamDefaultReader<string> | null = null
    private onDados: (dados: string) => void

    constructor(
        filtro: FiltroLuva,
        onDados: (dados: string) => void,
    ) {
        this.filtro = filtro
        this.onDados = onDados
    }

    async obterPortasAutorizadas(): Promise<SerialPort[]> {
        return navigator.serial.getPorts()
    }

    private async lerContinuamente() {
        if (!this.porta?.readable) {
            return
        }

        const textDecoder = new TextDecoderStream()

        const streamFechado = this.porta.readable.pipeTo(
            textDecoder.writable as unknown as WritableStream<Uint8Array>,
        )

        const reader = textDecoder.readable.getReader()

        this.reader = reader

        let buffer = ""

        while (this.porta?.readable) {
            try {
                while (true) {
                    const { value, done } =
                        await reader.read()

                    if (done) {
                        break
                    }

                    buffer += value

                    const linhas = buffer.split("\n")

                    buffer = linhas.pop() ?? ""

                    for (const linha of linhas) {
                        if (linha.trim()) {
                            this.onDados(linha)
                        }
                    }
                }
            } catch (erro) {
                console.error(
                    "Erro de leitura na luva, tentando recuperar",
                    erro,
                )
            } finally {
                reader.releaseLock()
            }
        }

        await streamFechado.catch(() => {})
    }

    async conectar(
        taxaEnvio = 9600,
    ): Promise<boolean> {
        const filters =
            Object.keys(this.filtro).length
                ? [this.filtro]
                : undefined

        try {
            this.porta =
                await navigator.serial.requestPort({
                    filters,
                })

            await this.porta.open({
                baudRate: taxaEnvio,
            })

            this.conectado = true

            this.lerContinuamente()

            return true
        } catch (erro) {
            if (
                erro instanceof DOMException &&
                erro.name === "NotFoundError"
            ) {
                console.warn(
                    "Usuário cancelou a seleção da porta",
                )
            } else {
                console.error(
                    "Erro ao abrir a porta",
                    erro,
                )
            }

            this.conectado = false

            return false
        }
    }

    async desconectar() {
        this.conectado = false

        await this.reader?.cancel()

        this.reader = null

        await this.porta?.close()

        this.porta = null
    }

    estaConectado() {
        return this.conectado
    }
}