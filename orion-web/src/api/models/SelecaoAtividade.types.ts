export enum StatusAtividade {
    Concluida = "concluida",
    Pendente = "pendente",
}

export enum ConteudoAtividade {
    Escala = "Escala",
    Intervalos = "Intervalo",
    Melodia = "Melodia",
}

export enum StatusFiltroAtividade {
    Todas = "Todas",
    Concluidas = "Concluídas",
    Pendentes = "Pendentes",
}

export type Atividade = {
    id: number,
    categoria: ConteudoAtividade,
    tipo: string,
    titulo: string,
    subTitulo: string,
    descricao: string
    ordem: number,
    chave: string,
}

export type AtividadeComStatus = Atividade & {
    status: StatusAtividade
}

export enum SelecaoAtividadeQueryKeys {
    ObterAtividades = "obterAtividades",
    ObterRegistroAtividades = "obterRegistroAtividades",
}

export namespace ObterAtividades {
    export type Response = Atividade[]
}

export namespace ObterRegistroAtividades {

    export type Request = {
        usuarioId: number
    }

    export type Response = {
        usuarioId: number,
        atividadeId: number
    }[]
}