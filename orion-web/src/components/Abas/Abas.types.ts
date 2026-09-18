import type { SxProps, Theme } from "@mui/material"

export type ItemAba<TValor extends string = string> = {
    valor: TValor
    rotulo: string
}

export type AbasProps<TValor extends string = string> = {
    abas: ItemAba<TValor>[]
    valorSelecionado: TValor
    aoAlterar: (valor: TValor) => void
    sx?: SxProps<Theme>
}
