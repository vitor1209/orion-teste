import type z from "zod"
import type { ProdutoPedido } from "@/api/models/FinalizarPedido.types"
import type { finalizarPedidoSchema } from "@/utils/validacoes"

export type FinalizarPedidoSchema = z.infer<typeof finalizarPedidoSchema>

export type CampoFormularioPedido = {
    name: keyof FinalizarPedidoSchema
    label: string
    placeholder: string
    mascara?: string
}

export type ValorResumoPedido = {
    label: string
    valor: string
}

export type ResumoPedidoProps = {
    produto: ProdutoPedido
    quantidade: number
    aoDiminuirQuantidade: () => void
    aoAumentarQuantidade: () => void
    valoresResumo: ValorResumoPedido[]
    total: string
    isSubmitting: boolean
    isValid: boolean
}

export type ModalPedidoConcluidoProps = {
    aberto: boolean
    aoFechar: () => void
}
