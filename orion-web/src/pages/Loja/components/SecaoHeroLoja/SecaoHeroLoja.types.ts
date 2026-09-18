import type { Produto } from "@/api/models/Loja.types"

export type SecaoHeroLojaProps = {
    produto: Produto
    quantidade: number
    aoDiminuirQuantidade: () => void
    aoAumentarQuantidade: () => void
    imagemAtiva: number
    aoSelecionarImagem: (indice: number) => void
    aoVoltarImagem: () => void
    aoAvancarImagem: () => void
}