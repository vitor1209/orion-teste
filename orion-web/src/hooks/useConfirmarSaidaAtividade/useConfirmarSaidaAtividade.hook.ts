import { useState } from "react"

export const useConfirmarSaidaAtividade = () => {
    const [modalSaidaAberto, setModalSaidaAberto] = useState(false)

    const abrirModalSaida = () => setModalSaidaAberto(true)
    const fecharModalSaida = () => setModalSaidaAberto(false)

    return { modalSaidaAberto, abrirModalSaida, fecharModalSaida }
}
