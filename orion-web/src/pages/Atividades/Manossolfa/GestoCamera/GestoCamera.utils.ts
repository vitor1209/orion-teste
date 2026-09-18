import type { NotaComOitava } from "@/utils/Notas.types"
import type { NotaEnsinada } from "./GestoCamera.types"
import doImg from "@/assets/images/exemplos/do.jpg";
import reImg from "@/assets/images/exemplos/re.jpg";
import miImg from "@/assets/images/exemplos/mi.jpg";
import faImg from "@/assets/images/exemplos/fa.jpg";
import solImg from "@/assets/images/exemplos/sol.jpg";
import laImg from "@/assets/images/exemplos/la.jpg";
import siImg from "@/assets/images/exemplos/si.jpg";

import doVideo from "@/assets/videos/exemplos/do.mp4";
import reVideo from "@/assets/videos/exemplos/re.mp4";
import miVideo from "@/assets/videos/exemplos/mi.mp4";
import faVideo from "@/assets/videos/exemplos/fa.mp4";
import solVideo from "@/assets/videos/exemplos/sol.mp4";
import laVideo from "@/assets/videos/exemplos/la.mp4";
import siVideo from "@/assets/videos/exemplos/si.mp4";

type NotaBaseManossolfa = Omit<NotaEnsinada, "nota"> & {
    letra: "C" | "D" | "E" | "F" | "G" | "A" | "B"
}

const NOTAS_BASE_MANOSSOLFA: NotaBaseManossolfa[] = [
    { letra: "C", nomeExibicao: "Dó", descricaoOrdinal: "Primeira nota da escala", imagem: doImg, video: doVideo, dicaGesto: "Estenda o polegar e feche os outros dedos." },
    { letra: "D", nomeExibicao: "Ré", descricaoOrdinal: "Segunda nota da escala", imagem: reImg, video: reVideo, dicaGesto: "Estenda o polegar e o indicador e feche os outros dedos." },
    { letra: "E", nomeExibicao: "Mi", descricaoOrdinal: "Terceira nota da escala", imagem: miImg, video: miVideo, dicaGesto: "Estenda o polegar, o indicador e o dedo médio e dobre os outros dedos." },
    { letra: "F", nomeExibicao: "Fá", descricaoOrdinal: "Quarta nota da escala", imagem: faImg, video: faVideo, dicaGesto: "Estenda os quatro dedos e feche o polegar." },
    { letra: "G", nomeExibicao: "Sol", descricaoOrdinal: "Quinta nota da escala", imagem: solImg, video: solVideo, dicaGesto: "Estenda todos os dedos." },
    { letra: "A", nomeExibicao: "Lá", descricaoOrdinal: "Sexta nota da escala", imagem: laImg, video: laVideo, dicaGesto: "Estenda o polegar e o dedo mínimo e feche os outros dedos." },
    { letra: "B", nomeExibicao: "Si", descricaoOrdinal: "Sétima nota da escala", imagem: siImg, video: siVideo, dicaGesto: "Estenda apenas o dedo mínimo." },
]

export const OITAVAS_MANOSSOLFA = [3, 4, 5] as const

export type OitavaManossolfa = (typeof OITAVAS_MANOSSOLFA)[number]

export const OITAVA_MANOSSOLFA_POR_CHAVE: Record<string, OitavaManossolfa> = {
    "manossolfa-gesto-camera": 4,
    "manossolfa-gesto-camera-pt2": 5,
    "manossolfa-gesto-camera-pt3": 3,
}

export const criarNotasManossolfa = (oitava: OitavaManossolfa): NotaEnsinada[] =>
    NOTAS_BASE_MANOSSOLFA.map(({ letra, ...notaBase }) => ({
        ...notaBase,
        nota: `${letra}${oitava}` as NotaComOitava,
    }))

export const NOMES_PILL: Partial<Record<NotaComOitava, string>> = OITAVAS_MANOSSOLFA.flatMap(criarNotasManossolfa).reduce(
    (acumulador, notaEnsinada) => ({ ...acumulador, [notaEnsinada.nota]: notaEnsinada.nomeExibicao }),
    {},
)
