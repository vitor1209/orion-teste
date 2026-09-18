import { useEffect, useState } from "react"
import type { IndicadorProgressoScrollProps } from "./IndicadorProgressoScroll.types"

export const useIndicadorProgressoScroll = ({ refCard }: IndicadorProgressoScrollProps) => {
    const [progresso, setProgresso] = useState(0)
    const [proporcaoVisivel, setProporcaoVisivel] = useState(1)

    useEffect(() => {
        const elemento = refCard.current
        if (!elemento) return

        const calcularProgresso = () => {
            const { scrollTop, scrollHeight, clientHeight } = elemento
            const scrollDisponivel = scrollHeight - clientHeight
            setProgresso(scrollDisponivel > 0 ? scrollTop / scrollDisponivel : 0)
            setProporcaoVisivel(Math.min(1, clientHeight / scrollHeight))
        }

        calcularProgresso()
        elemento.addEventListener("scroll", calcularProgresso)
        return () => elemento.removeEventListener("scroll", calcularProgresso)
    }, [refCard])

    return { progresso, proporcaoVisivel }
}
