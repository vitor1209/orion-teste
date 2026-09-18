export type ProdutoPedido = {
    id: number
    nome: string
    imagem: string
    precoUnitario: number
}

export enum FinalizarPedidoQueryKeys {
    ObterProdutoPedido = "obterProdutoPedido",
}

export namespace ObterProdutoPedido {
    export type Response = {
        produto: ProdutoPedido
        frete: number
        desconto: number
    }
}

export namespace EnviarPedido {
    export type Request = {
        nomeCompleto: string
        cpf: string
        cep: string
        endereco: string
        numero: string
        bairro: string
        cidade: string
        estado: string
        metodoPagamento: "pix"
        quantidade: number
    }

    export type Response = {
        numeroPedido: string
    }
}