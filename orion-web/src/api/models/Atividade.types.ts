export enum AtividadeQueryKeys {
    FinalizarAtividade = "finalizarAtividade",
}

export namespace FinalizarAtividade {
    export type Request = {
        usuarioId: number
        atividadeId: number
    }

    export type Response = {
        dataCadastro: string,
        dataAtualizacao: string,
        id: number,
        usuarioId: number,
        atividadeId: number
    }
}
