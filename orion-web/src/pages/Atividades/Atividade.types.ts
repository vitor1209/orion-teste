import type { Atividade } from "@/api/models/SelecaoAtividade.types"

export type PaginaAtividadeProps = {
    atividade?: Atividade
    rotaVoltar?: string
}

export type EstadoAtividade = "carregando" | "indisponivel"
