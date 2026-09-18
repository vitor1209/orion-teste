import { useState } from "react"

export const usePainelFiltrosAtividade = () => {
    const [filtrosAbertos, setFiltrosAbertos] = useState(false)

    const alternarFiltros = () => setFiltrosAbertos((aberto) => !aberto)

    return { filtrosAbertos, alternarFiltros }
}