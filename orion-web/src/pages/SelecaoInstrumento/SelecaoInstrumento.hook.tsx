import { useLocation, useNavigate } from "react-router"
import { ModoJogo, type Instrumento } from "./SelecaoInstrumento.types"
import { INSTRUMENTOS, SUBTITULO_POR_MODO } from "./SelecaoInstrumento.utils"

export const useSelecaoInstrumento = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const params = new URLSearchParams(location.search)
    const modo = (params.get("modo") ?? ModoJogo.Guiado) as ModoJogo
    const interacao = params.get("interacao") ?? "luva"

    const rotaVoltar = `/selecao-modo?modo=${modo}`

    const selecionarInstrumento = (titulo: Instrumento["titulo"]) => {
        const query = new URLSearchParams({ modo, interacao, instrumento: titulo.toLowerCase() })
        navigate(`/selecao-atividade?${query.toString()}`, { viewTransition: true })
    }

    return { subtitulo: SUBTITULO_POR_MODO[modo], rotaVoltar, instrumentos: INSTRUMENTOS, selecionarInstrumento }
}