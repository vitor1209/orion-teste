import type { ButtonBaseProps } from "@mui/material"
import type { LucideIcon } from "lucide-react"

export interface ButtonProp extends ButtonBaseProps {
    variante?:
    | "Branco"
    | "Roxo"
    | "Gradiente"
    | "Preto"
    | "Vermelho"
    | "Voltar"
    | "Icone"
    | "Filtro"
    | "Finalizar"
    | "BrancoComBorda"

    tamanho: "sm" | "md" | "lg" | "xl"
    espacamento?: number
    loading?: boolean
    ativo?: boolean
    to?: string
    href?: string
    viewTransition?: boolean
    icon?: LucideIcon
    ladoIcon?: "esquerda" | "direita"
}