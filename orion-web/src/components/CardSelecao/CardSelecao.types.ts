export type CardSelecaoVariante = "modo" | "instrumento"

export type CardSelecaoProps = {
    variante?: CardSelecaoVariante
    titulo: string
    descricao: string
    icone: string
    alt: string
    aoClicar: () => void
    larguraImagem?: string
}