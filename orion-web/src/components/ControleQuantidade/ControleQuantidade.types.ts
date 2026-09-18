export type ControleQuantidadeProps = {
    quantidade: number
    aoDiminuir: () => void
    aoAumentar: () => void
    variante?: "padrao" | "compacto"
    desabilitarDiminuir?: boolean
    ariaLabel?: string
}