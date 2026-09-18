import type { SxProps, Theme } from "@mui/material"
import estrelas from "@/assets/images/estrelass.png"
import { CONFIGURACAO_POR_VARIANTE, deslizarCamadaEstrelas, moverEstrelas, pulsarEstrelas } from "./FundoEstrelado.utils"
import type { VarianteFundoEstrelado } from "./FundoEstrelado.types"

export const container = (variante: VarianteFundoEstrelado): SxProps<Theme> => {
    const configuracao = CONFIGURACAO_POR_VARIANTE[variante]

    return {
        position: "relative",
        minHeight: configuracao.minHeight,
        backgroundColor: "#0C1528",
        backgroundImage: `url(${estrelas})`,
        backgroundRepeat: "repeat",
        backgroundSize: configuracao.backgroundSizeDesktop,
        backgroundPosition: "left -80px top -120px",
        overflow: "hidden",
        animation: `${moverEstrelas} 95s linear infinite`,

        "&::before": {
            content: '""',
            position: "absolute",
            inset: "-20%",
            backgroundImage:
                "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0 1px, transparent 1.8px), radial-gradient(circle, rgba(190, 207, 255, 0.85) 0 1px, transparent 1.6px)",
            backgroundSize: "320px 320px, 480px 480px",
            backgroundPosition: "20px 40px, 150px 180px",
            opacity: 0.2,
            pointerEvents: "none",
            animation: `${deslizarCamadaEstrelas} 70s linear infinite, ${pulsarEstrelas(
                configuracao.opacidadePulsarMin,
                configuracao.opacidadePulsarMax
            )} 7s ease-in-out infinite`,
        },

        "@media (max-width: 600px)": {
            backgroundSize: configuracao.backgroundSizeMobile,
            backgroundPosition: configuracao.backgroundPositionMobile,
            "&::before": {
                backgroundSize: "360px 360px, 540px 540px",
                opacity: 0.16,
            },
        },

        "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            "&::before": {
                animation: "none",
            },
        },
    }
}

export const brilhoCentral: SxProps<Theme> = {
    position: "absolute",
    inset: 0,
    background:
        "radial-gradient(circle at 48% 44%, rgba(139, 92, 246, 0.16), transparent 34%), radial-gradient(circle at 20% 22%, rgba(255, 255, 255, 0.08), transparent 22%)",
    pointerEvents: "none",
}