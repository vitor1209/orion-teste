import { useRef } from "react"
import { useNavigate } from "react-router"
import { useConfirmarSaidaAtividade } from "@/hooks/useConfirmarSaidaAtividade/useConfirmarSaidaAtividade.hook"

export const useExplicacaoAtividade = () => {
    const refCard = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const { modalSaidaAberto, abrirModalSaida, fecharModalSaida } = useConfirmarSaidaAtividade()

    const confirmarSaida = () => {
        fecharModalSaida()
        navigate(-1)
    }

    return { refCard, modalSaidaAberto, abrirModalSaida, fecharModalSaida, confirmarSaida }
}
