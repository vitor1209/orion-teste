import { useEffect, useRef, useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material"

export const useCartaoPiano = (larguraPiano: number) => {
    const [larguraDisponivel, setLarguraDisponivel] = useState(0)

    const cartaoRef = useRef<HTMLDivElement | null>(null)
    const theme = useTheme()
    const telaReduzida = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true })

    const larguraTeclado =
        telaReduzida && larguraDisponivel > 0 ? Math.min(larguraPiano, larguraDisponivel) : larguraPiano

    useEffect(() => {
        const cartao = cartaoRef.current
        if (!cartao) return

        const observer = new ResizeObserver(([entrada]) => {
            if (entrada) setLarguraDisponivel(Math.floor(entrada.contentRect.width))
        })

        observer.observe(cartao)

        return () => observer.disconnect()
    }, [])

    return { cartaoRef, larguraTeclado }
}
