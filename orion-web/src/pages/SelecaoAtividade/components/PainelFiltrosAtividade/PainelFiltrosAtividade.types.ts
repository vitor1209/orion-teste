import type { ConteudoAtividade, StatusFiltroAtividade } from "../../../../api/models/SelecaoAtividade.types"

export type PainelFiltrosAtividadeProps = {
    nomeUsuario: string
    busca: string
    aoAlterarBusca: (valor: string) => void
    statusSelecionado: StatusFiltroAtividade
    aoSelecionarStatus: (status: StatusFiltroAtividade) => void
    conteudoSelecionado: ConteudoAtividade | null
    aoSelecionarConteudo: (conteudo: ConteudoAtividade) => void
}