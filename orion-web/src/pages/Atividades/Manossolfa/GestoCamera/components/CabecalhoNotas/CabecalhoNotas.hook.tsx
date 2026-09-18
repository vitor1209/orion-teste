import { useNavigate } from "react-router"
import { useConfirmarSaidaAtividade } from "@/hooks/useConfirmarSaidaAtividade/useConfirmarSaidaAtividade.hook"

export const useCabecalhoNotas = (rotaVoltar: string) => {
    const navigate = useNavigate()
    const { modalSaidaAberto, abrirModalSaida, fecharModalSaida } = useConfirmarSaidaAtividade()

    const confirmarSaida = () => {
        fecharModalSaida()
        navigate(rotaVoltar, { viewTransition: true })
    }

    return { modalSaidaAberto, abrirModalSaida, fecharModalSaida, confirmarSaida }
}
