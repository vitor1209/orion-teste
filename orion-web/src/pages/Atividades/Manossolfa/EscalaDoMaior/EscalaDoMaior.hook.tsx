import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import * as Tone from "tone"
import type { NotaComOitava } from "@/utils/Notas.types"
import type { StatusNotaPartitura } from "@/components/Partitura/Partitura.type"
import { useNotes } from "@/hooks/useNotes/useNotes.hook"
import { useNotaSound } from "@/hooks/useNotaSound/useNotaSound.hook"
import { montarRotaSelecaoAtividade } from "@/pages/Atividades/Atividade.utils"
import type { PaginaAtividadeProps } from "@/pages/Atividades/Atividade.types"
import { FaseEscalaDoMaior } from "./EscalaDoMaior.types"
import { DURACAO_CONFIRMACAO_SEGUNDOS, NOTAS_ESCALA_DO_MAIOR } from "./EscalaDoMaior.utils"

export const useEscalaDoMaior = ({ rotaVoltar }: PaginaAtividadeProps) => {
    const [fase, setFase] = useState<FaseEscalaDoMaior>(FaseEscalaDoMaior.Introducao)
    const [indiceNotaAtual, setIndiceNotaAtual] = useState(0)
    const [isStreamActive, setIsStreamActive] = useState(false)
    const [wsAtivo, setWsAtivo] = useState(false)
    const [sessionKey, setSessionKey] = useState(0)
    const [contagem, setContagem] = useState<number | null>(null)
    const [tentativaConfirmacao, setTentativaConfirmacao] = useState(0)
    const [ultimaNotaAnterior, setUltimaNotaAnterior] = useState<NotaComOitava | undefined>(undefined)
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)

    const location = useLocation()

    const { ultimaNota, statusConexao } = useNotes(wsAtivo)
    const { play } = useNotaSound({})

    const params = new URLSearchParams(location.search)
    const nivel = params.get("nivel") ?? "iniciante"
    const notaAlvoAtual = NOTAS_ESCALA_DO_MAIOR[indiceNotaAtual]
    const ultimaNotaDaLista = indiceNotaAtual === NOTAS_ESCALA_DO_MAIOR.length - 1
    const notaReconhecida = ultimaNota === notaAlvoAtual
    const emConfirmacao = contagem !== null && contagem > 0
    const rotaVoltarFinal = rotaVoltar ?? montarRotaSelecaoAtividade(location.search)

    const statusNotas: StatusNotaPartitura[] = NOTAS_ESCALA_DO_MAIOR.map((_, indice) =>
        indice < indiceNotaAtual ? "concluida" : indice === indiceNotaAtual ? "ativa" : "proxima"
    )

    if (ultimaNota !== ultimaNotaAnterior) {
        setUltimaNotaAnterior(ultimaNota)

        if (notaReconhecida) {
            setMensagemErro(null)
            setContagem(DURACAO_CONFIRMACAO_SEGUNDOS)
            setTentativaConfirmacao((atual) => atual + 1)
        }
        else {
            setContagem(null)
        }
    }

    if (contagem === 0) {
        setContagem(null)

        if (ultimaNotaDaLista) {
            setFase(FaseEscalaDoMaior.Concluida)
        } else {
            setIndiceNotaAtual((indiceAtual) => indiceAtual + 1)
        }
    }

    const iniciarPratica = () => setFase(FaseEscalaDoMaior.Pratica)

    const iniciarSessao = async () => {
        await Tone.start()
        setIsStreamActive(true)
        setWsAtivo(true)
        setSessionKey((chaveAtual) => chaveAtual + 1)
    }

    const pararSessao = () => {
        setIsStreamActive(false)
        setWsAtivo(false)
    }

    useEffect(() => {
        if (!notaReconhecida) return

        play(notaAlvoAtual)
    }, [notaReconhecida, notaAlvoAtual, play])

    useEffect(() => {
        if (!notaReconhecida) return

        const intervalo = setInterval(() => {
            setContagem((atual) => (atual === null ? null : atual - 1))
        }, 1000)

        return () => clearInterval(intervalo)
    }, [notaReconhecida])

    return {
        fase,
        nivel,
        isStreamActive,
        sessionKey,
        ultimaNota,
        statusConexao,
        statusNotas,
        mensagemErro,
        rotaVoltarFinal,
        contagem,
        emConfirmacao,
        tentativaConfirmacao,
        iniciarPratica,
        iniciarSessao,
        pararSessao,
    }
}
