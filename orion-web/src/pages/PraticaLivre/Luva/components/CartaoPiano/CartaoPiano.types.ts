import type { Oitava } from "../../Luva.types"

export type CartaoPianoProps = {
    oitava: Oitava
    primeiraNota: number
    ultimaNota: number
    larguraPiano: number
    notaAtiva: number | null
    aoTocarNota: (midiNumber: number) => void
}