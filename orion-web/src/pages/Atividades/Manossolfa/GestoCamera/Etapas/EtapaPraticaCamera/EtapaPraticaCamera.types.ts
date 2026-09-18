import type { NotaEnsinada } from "../../GestoCamera.types"

export type EtapaPraticaCameraProps = {
    notaEnsinada: NotaEnsinada
    onGestoReconhecido: () => void
    onRetornar: () => void
}
