import { useSyncExternalStore } from "react"

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
    sequencia: number
    conectado: boolean
    luva: Luva | null
}

type FiltroLuva = {
    usbVendorId?: number
    usbProductId?: number
}

const TEMPO_ATE_SOLTAR_MS = 250
const TENTATIVAS_ABERTURA = 3
const INTERVALO_ENTRE_TENTATIVAS_MS = 250
const TEMPO_MAXIMO_ENCERRAR_LEITURA_MS = 3000
const TAXA_ENVIO_PADRAO = 9600

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

const EVENTOS_DE_SOLTURA = ["soltar", "soltou", "release", "note_off", "off"]

const esperar = (milissegundos: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, milissegundos))

const isNotaValida = (valor: unknown): valor is Nota =>
    typeof valor === "string" && NOTAS_VALIDAS.includes(valor as Nota)

const isEventoSoltar = (payload: Record<string, unknown>): boolean => {
    if ("nota" in payload && payload.nota === null) return true

    if (payload.pressionado === false || payload.ativo === false) return true

    const evento = payload.evento ?? payload.tipo

    return typeof evento === "string" && EVENTOS_DE_SOLTURA.includes(evento.toLowerCase())
}

class LuvaStore {
    private listeners = new Set<() => void>()

    private timerSoltar: ReturnType<typeof setTimeout> | null = null

    private conectando = false

    private fila: Promise<unknown> = Promise.resolve()

    private estado: EstadoLuva = {
        estado: null,
        sequencia: 0,
        conectado: false,
        luva: null,
    }

    subscribe = (listener: () => void) => {
        this.listeners.add(listener)

        return () => {
            this.listeners.delete(listener)
        }
    }

    getSnapshot = () => this.estado

    conectar() {
        return this.enfileirar(() => this.executarConexao())
    }

    desconectar() {
        return this.enfileirar(() => this.executarDesconexao())
    }

    private enfileirar<T>(operacao: () => Promise<T>): Promise<T> {
        const proxima = this.fila.then(operacao, operacao)

        this.fila = proxima.catch(() => {})

        return proxima
    }

    private notificiar() {
        for (const listener of this.listeners) {
            listener()
        }
    }

    private atualizar(alteracoes: Partial<EstadoLuva>) {
        this.estado = {
            ...this.estado,
            ...alteracoes,
        }

        this.notificiar()
    }

    private cancelarTimerSoltar() {
        if (this.timerSoltar === null) return

        clearTimeout(this.timerSoltar)

        this.timerSoltar = null
    }

    private agendarSoltura() {
        this.cancelarTimerSoltar()

        this.timerSoltar = setTimeout(() => {
            this.timerSoltar = null

            this.soltarNota()
        }, TEMPO_ATE_SOLTAR_MS)
    }

    private soltarNota() {
        this.cancelarTimerSoltar()

        if (!this.estado.estado) return

        this.atualizar({ estado: null })
    }

    private pressionarNota(nota: Nota) {
        this.agendarSoltura()

        const ehRepeticaoDaNotaSegurada = this.estado.estado?.nota === nota

        if (ehRepeticaoDaNotaSegurada) return

        this.atualizar({
            estado: { nota },
            sequencia: this.estado.sequencia + 1,
        })
    }

    private processarLinha(linha: string) {
        let dados: unknown

        try {
            dados = JSON.parse(linha)
        } catch (erro) {
            console.error("Luva: JSON inválido recebido:", linha, erro)
            return
        }

        if (!dados || typeof dados !== "object") {
            console.warn("Luva: payload inválido recebido:", dados)
            return
        }

        const payload = dados as Record<string, unknown>

        if (isEventoSoltar(payload)) {
            this.soltarNota()
            return
        }

        if (!isNotaValida(payload.nota)) {
            console.warn("Luva: nota inválida recebida:", dados)
            return
        }

        this.pressionarNota(payload.nota)
    }

    private async executarConexao() {
        if (this.estado.luva || this.conectando) return

        this.conectando = true

        console.log("Luva: iniciando conexão...")

        try {
            const luva = new Luva(
                {},
                (linha) => this.processarLinha(linha),
                () => {
                    console.warn("Luva: conexão encerrada pelo dispositivo")
                    void this.desconectar()
                },
            )

            this.atualizar({ luva })

            const conectou = await luva.conectar()

            console.log("Luva: conexão result:", conectou)

            if (!conectou) {
                this.atualizar({ luva: null, conectado: false })
                return
            }

            this.atualizar({ conectado: true })
        } finally {
            this.conectando = false
        }
    }

    private async executarDesconexao() {
        const luva = this.estado.luva

        this.cancelarTimerSoltar()

        if (!luva) return

        console.log("Luva: desconectando...")

        this.atualizar({
            luva: null,
            conectado: false,
            estado: null,
        })

        try {
            await luva.desconectar()
        } catch (erro) {
            console.error("Luva: erro ao desconectar", erro)
        }
    }
}

const luvaStore = new LuvaStore()

export const useLuva = () => {
    const snapshot = useSyncExternalStore(
        luvaStore.subscribe,
        luvaStore.getSnapshot,
        luvaStore.getSnapshot,
    )

    const conectar = () => luvaStore.conectar()

    const desconectar = () => luvaStore.desconectar()

    return {
        conectar,
        desconectar,
        estado: snapshot.estado,
        sequencia: snapshot.sequencia,
        conectado: snapshot.conectado,
    }
}

let ultimaPortaConectada: SerialPort | null = null

class Luva {
    private filtro: FiltroLuva
    private porta: SerialPort | null = null
    private conectado = false
    private reader: ReadableStreamDefaultReader<string> | null = null
    private abortarLeitura: AbortController | null = null
    private leituraEncerrada: Promise<void> | null = null
    private onDados: (dados: string) => void
    private onEncerrado: () => void

    constructor(
        filtro: FiltroLuva,
        onDados: (dados: string) => void,
        onEncerrado: () => void = () => {},
    ) {
        this.filtro = filtro
        this.onDados = onDados
        this.onEncerrado = onEncerrado
    }

    async obterPortasAutorizadas(): Promise<SerialPort[]> {
        return navigator.serial.getPorts()
    }

    estaConectado() {
        return this.conectado
    }

    async conectar(taxaEnvio = TAXA_ENVIO_PADRAO): Promise<boolean> {
        if (ultimaPortaConectada) {
            console.log("Luva: reaproveitando a porta da conexão anterior")

            if (await this.abrirPorta(ultimaPortaConectada, taxaEnvio)) {
                return this.iniciarLeitura(ultimaPortaConectada)
            }

            console.warn("Luva: a porta memorizada não abriu; pedindo a porta de novo")

            ultimaPortaConectada = null
        }

        const porta = await this.pedirPorta()

        if (!porta) return false

        if (!(await this.abrirPorta(porta, taxaEnvio))) return false

        return this.iniciarLeitura(porta)
    }

    async desconectar() {
        const porta = this.porta

        if (!porta) return

        this.conectado = false
        this.porta = null

        this.abortarLeitura?.abort()
        this.abortarLeitura = null

        try {
            void this.reader?.cancel().catch(() => {})
        } catch {
            this.reader = null
        }

        this.reader = null

        await this.aguardarEncerramentoDaLeitura()

        try {
            await porta.close()
        } catch (erro) {
            console.warn("Luva: erro ao fechar a porta", erro)
        }
    }

    private async pedirPorta(): Promise<SerialPort | null> {
        const filters = Object.keys(this.filtro).length ? [this.filtro] : undefined

        try {
            return await navigator.serial.requestPort({ filters })
        } catch (erro) {
            const nome = erro instanceof DOMException ? erro.name : ""

            if (nome === "NotFoundError") {
                console.warn("Luva: usuário cancelou a seleção da porta")
            } else if (nome === "SecurityError") {
                console.warn("Luva: o seletor de porta exige um clique novo — clique em conectar outra vez")
            } else {
                console.error("Luva: erro ao selecionar a porta", erro)
            }

            return null
        }
    }

    private async abrirPorta(porta: SerialPort, taxaEnvio: number): Promise<boolean> {
        await this.fecharSeAindaEstiverAberta(porta)

        for (let tentativa = 1; tentativa <= TENTATIVAS_ABERTURA; tentativa += 1) {
            try {
                await porta.open({ baudRate: taxaEnvio })

                return true
            } catch (erro) {
                const continuouAberta =
                    erro instanceof DOMException &&
                    erro.name === "InvalidStateError" &&
                    porta.readable !== null

                if (continuouAberta) {
                    console.warn("Luva: porta já estava aberta, reaproveitando")
                    return true
                }

                console.warn(
                    `Luva: tentativa ${tentativa}/${TENTATIVAS_ABERTURA} de abrir a porta falhou`,
                    erro,
                )

                if (tentativa === TENTATIVAS_ABERTURA) return false

                await esperar(INTERVALO_ENTRE_TENTATIVAS_MS)
            }
        }

        return false
    }

    private async fecharSeAindaEstiverAberta(porta: SerialPort) {
        if (!porta.readable && !porta.writable) return

        console.warn("Luva: porta ainda aberta de uma conexão anterior, fechando antes de reabrir")

        try {
            await porta.close()
        } catch (erro) {
            console.warn("Luva: falha ao fechar a porta reaproveitada", erro)
        }
    }

    private iniciarLeitura(porta: SerialPort): boolean {
        if (porta.readable?.locked) {
            console.error(
                "Luva: o stream da porta ficou travado por uma leitura anterior; recarregue a página",
            )

            return false
        }

        ultimaPortaConectada = porta

        this.porta = porta
        this.conectado = true

        void this.lerContinuamente()

        return true
    }

    private async aguardarEncerramentoDaLeitura() {
        let encerrouSozinha = true

        await Promise.race([
            (this.leituraEncerrada ?? Promise.resolve()).then(() => {}),
            esperar(TEMPO_MAXIMO_ENCERRAR_LEITURA_MS).then(() => {
                encerrouSozinha = false
            }),
        ])

        if (!encerrouSozinha) {
            console.warn("Luva: o stream não encerrou a tempo; a porta pode precisar ser reaberta")
        }

        this.leituraEncerrada = null
    }

    private async lerContinuamente() {
        const porta = this.porta

        if (!porta?.readable) return

        const textDecoder = new TextDecoderStream()
        const abortar = new AbortController()

        this.abortarLeitura = abortar

        this.leituraEncerrada = porta.readable
            .pipeTo(textDecoder.writable as unknown as WritableStream<Uint8Array>, {
                signal: abortar.signal,
            })
            .catch(() => {})

        const reader = textDecoder.readable.getReader()

        this.reader = reader

        let buffer = ""

        try {
            while (true) {
                const { value, done } = await reader.read()

                if (done) break

                buffer += value

                const linhas = buffer.split("\n")

                buffer = linhas.pop() ?? ""

                for (const linha of linhas) {
                    if (linha.trim()) this.onDados(linha)
                }
            }
        } catch (erro) {
            if (this.conectado) console.error("Luva: erro de leitura", erro)
        } finally {
            try {
                reader.releaseLock()
            } catch {
                this.reader = null
            }
        }

        const dispositivoCaiuSozinho = this.conectado

        if (dispositivoCaiuSozinho) this.onEncerrado()
    }
}
