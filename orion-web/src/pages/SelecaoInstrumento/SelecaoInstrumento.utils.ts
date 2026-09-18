import flautaImage from "@/assets/images/flauta.png"
import violaoImage from "@/assets/images/guitarra.png"
import pianoImage from "@/assets/images/piano.png"

import { ModoJogo, type Instrumento } from "./SelecaoInstrumento.types"

export const INSTRUMENTOS: Instrumento[] = [
    { titulo: "Teclado", descricao: "instrumento eletrofone", imagem: pianoImage, larguraImagem: "190px" },
    { titulo: "Flauta", descricao: "instrumento de sopro", imagem: flautaImage, larguraImagem: "190px" },
    { titulo: "Violão", descricao: "instrumento de cordas", imagem: violaoImage, larguraImagem: "160px" },
]

export const SUBTITULO_POR_MODO: Record<ModoJogo, string> = {
    [ModoJogo.Livre]: "Selecione o instrumento que deseja praticar.",
    [ModoJogo.Guiado]: "Selecione o instrumento que deseja aprender.",
}