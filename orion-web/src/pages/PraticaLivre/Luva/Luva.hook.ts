import type { MouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { MidiNumbers } from "react-piano"
import type { LogLuva, Oitava } from "./Luva.types"
import { obterLarguraPiano, obterPrimeiraNota, obterUltimaNota } from "./Luva.utils"
import type { NotaComOitava } from "@/utils/Notas.types"
import { useLuva } from "@/hooks/useLuva/useLuva.hook"
import { useNotaSound } from "@/hooks/useNotaSound/useNotaSound.hook"

export const useLuvaPage = () => {
    const [oitava, setOitava] = useState<Oitava>("4")
    const [notas, setNotas] = useState<NotaComOitava[]>([])
    const [logs, setLogs] = useState<LogLuva[]>([])

    const ultimaSequenciaRegistrada = useRef<number | null>(null)

    const rotaVoltar = "/selecao-modo?modo=livre"

    const { estado, sequencia, conectar, desconectar, conectado } = useLuva()
    const { play } = useNotaSound({})

    const primeiraNota = obterPrimeiraNota(oitava)
    const ultimaNota = obterUltimaNota(oitava)
    const larguraPiano = obterLarguraPiano(primeiraNota, ultimaNota)

    const notaAtiva = (() => {
        if (!estado?.nota) return null
        try {
            return MidiNumbers.fromNote(`${estado.nota}${oitava}` as NotaComOitava)
        } catch {
            return null
        }
    })()

    const alterarOitava = (_: MouseEvent<HTMLElement>, novaOitava: Oitava | null) => {
        if (novaOitava !== null) setOitava(novaOitava)
    }

    const alternarConexao = () => (conectado ? void desconectar() : void conectar())

    const limparNotas = () => setNotas([])

    const removerUltimaNota = () => setNotas((notasAtuais) => notasAtuais.slice(0, -1))

    const tocarNota = async (midiNumber: number) => {
        const { note } = MidiNumbers.getAttributes(midiNumber)
        await play(note as NotaComOitava)
        setNotas((notasAtuais) => [...notasAtuais, note as NotaComOitava])
    }

    useEffect(() => {
        if (ultimaSequenciaRegistrada.current === null) {
            ultimaSequenciaRegistrada.current = sequencia
            return
        }

        if (sequencia === ultimaSequenciaRegistrada.current) return

        ultimaSequenciaRegistrada.current = sequencia

        if (!estado?.nota) return

        const horario = new Date().toLocaleTimeString()

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLogs((logsAtuais) => [
            ...logsAtuais,
            { horario, mensagem: `Luva: ${estado.nota}${oitava}` },
        ])
    }, [sequencia, estado?.nota, oitava])

    useEffect(() => {
        const horario = new Date().toLocaleTimeString()
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLogs((logsAtuais) => [...logsAtuais, { horario, mensagem: `Conectado: ${conectado}` }])
    }, [conectado])

    return {
        oitava,
        alterarOitava,
        conectado,
        alternarConexao,
        primeiraNota,
        ultimaNota,
        larguraPiano,
        notaAtiva,
        tocarNota,
        notas,
        limparNotas,
        removerUltimaNota,
        logs,
        rotaVoltar,
    }
}
