export type GaleriaProdutoProps = {
    imagens: string[]
    imagemAtiva: number
    aoSelecionarImagem: (indice: number) => void
    aoVoltarImagem: () => void
    aoAvancarImagem: () => void
    nomeProduto: string
}