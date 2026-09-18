import { useState } from "react"
import * as Tone from "tone"

export const useCameraPage = () => {
    const [isStreamActive, setIsStreamActive] = useState(false)
    const [wsAtivo, setWsAtivo] = useState(false)
    const [sessionKey, setSessionKey] = useState(0)

    const rotaVoltar = "/selecao-modo?modo=livre"

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

    return { isStreamActive, wsAtivo, sessionKey, rotaVoltar, iniciarSessao, pararSessao }
}