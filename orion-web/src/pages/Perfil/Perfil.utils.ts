import { CircleCheck, Package, PackageOpen, Truck } from "lucide-react"
import type { TrilhaEtapa } from "@/components/Trilha/Trilha.types"

export const ETAPAS_PEDIDO: TrilhaEtapa[] = [
    {
        titulo: "Preparando",
        legenda: "Data da compra",
        data: "02/09/2026",
        icon: PackageOpen,
        concluida: true,
    },
    {
        titulo: "Enviado",
        legenda: "Entregue à transportadora",
        data: "05/09/2026",
        icon: Package,
        concluida: true,
    },
    {
        titulo: "A caminho",
        legenda: "Em direção a você",
        data: "06/09/2026",
        icon: Truck,
        concluida: false,
    },
    {
        titulo: "Entregue",
        legenda: "Pedido finalizado",
        data: "10/09/2026",
        icon: CircleCheck,
        concluida: false,
    },
]
