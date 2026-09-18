import type { LucideIcon } from "lucide-react"

export type CardBeneficioVariante = "beneficio" | "pilar"

export type CardBeneficioProps = {
    variante?: CardBeneficioVariante
    titulo: string
    descricao: string
    icon?: LucideIcon
    imagem?: string
    imagemAlt?: string
    className?: string
}
