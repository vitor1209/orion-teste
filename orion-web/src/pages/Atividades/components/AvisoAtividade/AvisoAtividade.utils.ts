import type { EstadoAtividade } from "../../Atividade.types"

export const TEXTOS_AVISO: Record<EstadoAtividade, { titulo: string; descricao: string }> = {
    carregando: {
        titulo: "Preparando a atividade",
        descricao: "Estamos carregando os detalhes desta atividade. Isso leva só um instante.",
    },
    indisponivel: {
        titulo: "Atividade indisponível",
        descricao:
            "Não encontramos uma atividade para este endereço. Ela pode ter sido removida ou ainda não está disponível.",
    },
}
