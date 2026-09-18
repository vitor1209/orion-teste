import { useEffect, useState } from "react"
import { useNotes } from "@/hooks/useNotes/useNotes.hook"
import { useNotaSound } from "@/hooks/useNotaSound/useNotaSound.hook"
import type { EtapaPraticaCameraProps } from "./EtapaPraticaCamera.types"
import { DURACAO_CONFIRMACAO_SEGUNDOS } from "./EtapaPraticaCamera.utils"

export const useEtapaPraticaCamera = ({ notaEnsinada, onGestoReconhecido }: EtapaPraticaCameraProps) => {
    const [isStreamActive, setIsStreamActive] = useState(false)
    const [wsAtivo, setWsAtivo] = useState(false)
    const [contagem, setContagem] = useState<number | null>(null)
    const [tentativaConfirmacao, setTentativaConfirmacao] = useState(0)
    const [notaReconhecidaAnterior, setNotaReconhecidaAnterior] = useState(false)

    const { ultimaNota, statusConexao } = useNotes(wsAtivo)
    const { play } = useNotaSound({})

    const notaReconhecida = ultimaNota === notaEnsinada.nota
    const emConfirmacao = contagem !== null && contagem > 0

    if (notaReconhecida !== notaReconhecidaAnterior) {
        setNotaReconhecidaAnterior(notaReconhecida)
        setContagem(notaReconhecida ? DURACAO_CONFIRMACAO_SEGUNDOS : null)
        if (notaReconhecida) setTentativaConfirmacao((atual) => atual + 1)
    }

    const iniciarSessao = () => {
        setIsStreamActive(true)
        setWsAtivo(true)
    }

    const pararSessao = () => {
        setIsStreamActive(false)
        setWsAtivo(false)
    }

    useEffect(() => {
        if (!notaReconhecida) return

        play(notaEnsinada.nota)
    }, [notaReconhecida, notaEnsinada.nota, play])

    useEffect(() => {
        if (!notaReconhecida) return

        const intervalo = setInterval(() => {
            setContagem((atual) => (atual === null ? null : atual - 1))
        }, 1000)

        return () => clearInterval(intervalo)
    }, [notaReconhecida])

    useEffect(() => {
        if (contagem !== 0) return
        onGestoReconhecido()
    }, [contagem, onGestoReconhecido])

    return {
        isStreamActive,
        ultimaNota,
        statusConexao,
        notaReconhecida,
        emConfirmacao,
        contagem,
        tentativaConfirmacao,
        iniciarSessao,
        pararSessao,
    }
}
