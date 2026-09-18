import type { Atividade, AtividadeComStatus } from "../../api/models/SelecaoAtividade.types"

export type GradeAtividadesProps = {
    atividades: AtividadeComStatus[]
    aoSelecionarAtividade: (atividade: Atividade) => void
}