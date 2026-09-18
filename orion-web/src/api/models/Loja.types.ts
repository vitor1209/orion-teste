export type Produto = {
    id: number
    nome: string
    descricao: string
    precoReais: number
    imagens: string[]
    materiais: string[]
}

export enum LojaQueryKeys {
    ObterProduto = "obterProduto",
}

export namespace ObterProduto {
    export type Response = Produto
}