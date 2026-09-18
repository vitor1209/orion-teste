import type { LucideIcon } from "lucide-react"

export type TrilhaEtapa = {
    titulo: string
    legenda: string
    data: string
    icon: LucideIcon
    concluida: boolean
}

export type TrilhaProps = {
    etapas: TrilhaEtapa[]
    className?: string
}
