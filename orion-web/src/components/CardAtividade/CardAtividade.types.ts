import type { AtividadeComStatus } from "../../api/models/SelecaoAtividade.types"

export type CardAtividadeProps = {
    atividade: AtividadeComStatus
    onClick: () => void
}