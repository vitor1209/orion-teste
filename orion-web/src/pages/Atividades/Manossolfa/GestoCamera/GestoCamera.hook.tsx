import { useState } from "react"
import { useLocation } from "react-router"
import * as Tone from "tone"
import { montarRotaSelecaoAtividade } from "@/pages/Atividades/Atividade.utils"
import type { PaginaAtividadeProps } from "@/pages/Atividades/Atividade.types"
import { EtapaGesto, FaseGestoCamera } from "./GestoCamera.types"
import { criarNotasManossolfa, OITAVA_MANOSSOLFA_POR_CHAVE } from "./GestoCamera.utils"

export const useGestoCamera = ({ atividade, rotaVoltar }: PaginaAtividadeProps) => {
    const [fase, setFase] = useState<FaseGestoCamera>(FaseGestoCamera.Introducao)
    const [indiceNota, setIndiceNota] = useState(0)
    const [etapa, setEtapa] = useState<EtapaGesto>(EtapaGesto.Explicacao)
    const [sessionKey, setSessionKey] = useState(0)

    const location = useLocation()

    const params = new URLSearchParams(location.search)
    const nivel = params.get("nivel") ?? "iniciante"
    const oitava = OITAVA_MANOSSOLFA_POR_CHAVE[atividade?.chave ?? ""] ?? 4
    const notasManossolfa = criarNotasManossolfa(oitava)
    const notaAtual = notasManossolfa[indiceNota]
    const proximaNota = notasManossolfa[indiceNota + 1]
    const ultimaNotaDaLista = indiceNota === notasManossolfa.length - 1
    const rotaVoltarFinal = rotaVoltar ?? montarRotaSelecaoAtividade(location.search)

    const iniciarNotas = () => setFase(FaseGestoCamera.Notas)

    const avancarParaDemonstracao = () => {
        setEtapa(EtapaGesto.Demonstracao)
    }

    const avancarParaPratica = async () => {
        await Tone.start()
        setEtapa(EtapaGesto.Pratica)
        setSessionKey((chaveAtual) => chaveAtual + 1)
    }

    const retornarParaExplicacao = () => {
        setEtapa(EtapaGesto.Explicacao)
    }

    const retornarParaDemonstracao = () => {
        setEtapa(EtapaGesto.Demonstracao)
    }

    const confirmarGestoAprendido = () => setEtapa(EtapaGesto.Confirmacao)

    const avancarProximaNota = () => {
        if (ultimaNotaDaLista) {
            setFase(FaseGestoCamera.Concluida)
            return
        }
        setIndiceNota((indiceAtual) => indiceAtual + 1)
        setEtapa(EtapaGesto.Explicacao)
    }

    return {
        fase,
        etapa,
        notaAtual,
        proximaNota,
        indiceNota,
        nivel,
        oitava,
        notasManossolfa,
        rotaVoltarFinal,
        sessionKey,
        iniciarNotas,
        avancarParaDemonstracao,
        avancarParaPratica,
        confirmarGestoAprendido,
        avancarProximaNota,
        retornarParaDemonstracao,
        retornarParaExplicacao
    }
}
