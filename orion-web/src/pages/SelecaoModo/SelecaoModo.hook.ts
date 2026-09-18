import { useLocation, useNavigate } from "react-router"
import { ModoJogo } from "./SelecaoModo.types"

export const useSelecaoModo = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const modo = (new URLSearchParams(location.search).get("modo") ?? ModoJogo.Guiado) as ModoJogo
    const modoLivre = modo === ModoJogo.Livre

    const rotaVoltar = "/"
    const rotaCamera = modoLivre ? "/pratica-livre/camera" : `/selecao-atividade?modo=${modo}&interacao=camera`
    const rotaLuva = modoLivre ? "/pratica-livre/luva" : `/selecao-atividade?modo=${modo}&interacao=luva`

    const irParaLuva = () => navigate(rotaLuva, { viewTransition: true })
    const irParaCamera = () => navigate(rotaCamera, { viewTransition: true })

    return { modo, rotaVoltar, irParaLuva, irParaCamera }
}