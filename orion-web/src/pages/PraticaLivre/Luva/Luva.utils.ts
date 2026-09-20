import { MidiNumbers } from "react-piano"
import type { Oitava } from "./Luva.types"

export const OITAVAS: Oitava[] = ["1", "2", "3", "4", "5", "6", "7"]

export const LARGURA_POR_TECLA_BRANCA = 113

export const obterPrimeiraNota = (oitava: Oitava) => MidiNumbers.fromNote(`C${oitava}`)

export const obterUltimaNota = (oitava: Oitava) => MidiNumbers.fromNote(`B${oitava}`)

export const obterLarguraPiano = (primeiraNota: number, ultimaNota: number) => {
    let teclasBrancas = 0
    for (let midi = primeiraNota; midi <= ultimaNota; midi++) {
        const { pitchName } = MidiNumbers.getAttributes(midi)
        if (pitchName.length === 1) teclasBrancas++
    }
    return teclasBrancas * LARGURA_POR_TECLA_BRANCA
}