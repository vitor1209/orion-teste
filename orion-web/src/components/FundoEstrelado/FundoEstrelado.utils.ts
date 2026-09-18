import { keyframes } from "@emotion/react"
import type { ConfiguracaoFundoEstrelado, VarianteFundoEstrelado } from "./FundoEstrelado.types"

export const moverEstrelas = keyframes`
    from {
        background-position: left -80px top -120px;
    }

    to {
        background-position: left 120px top 120px;
    }
`

export const deslizarCamadaEstrelas = keyframes`
    from {
        transform: translate3d(0, 0, 0);
    }

    to {
        transform: translate3d(-90px, 70px, 0);
    }
`

export const pulsarEstrelas = (opacidadeMin: number, opacidadeMax: number) => keyframes`
    0%, 100% {
        opacity: ${opacidadeMin};
    }

    50% {
        opacity: ${opacidadeMax};
    }
`

export const CONFIGURACAO_POR_VARIANTE: Record<VarianteFundoEstrelado, ConfiguracaoFundoEstrelado> = {
    tela: {
        minHeight: "100dvh",
        backgroundSizeDesktop: "560px auto",
        backgroundSizeMobile: "940px auto",
        backgroundPositionMobile: "left -240px top -120px",
        opacidadePulsarMin: 0.28,
        opacidadePulsarMax: 0.46,
    },
    secao: {
        minHeight: "100vh",
        backgroundSizeDesktop: "620px auto",
        backgroundSizeMobile: "940px auto",
        backgroundPositionMobile: "left -240px top -120px",
        opacidadePulsarMin: 0.16,
        opacidadePulsarMax: 0.3,
    },
}