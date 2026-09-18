import type { SxProps, Theme } from "@mui/material"
import type { ReactNode } from "react"

export type VarianteFundoEstrelado = "tela" | "secao"

export type FundoEstreladoProps = {
    variante?: VarianteFundoEstrelado
    comBrilhoCentral?: boolean
    id?: string
    className?: string
    sx?: SxProps<Theme>
    children?: ReactNode
}

export type ConfiguracaoFundoEstrelado = {
    minHeight: string
    backgroundSizeDesktop: string
    backgroundSizeMobile: string
    backgroundPositionMobile: string
    opacidadePulsarMin: number
    opacidadePulsarMax: number
}