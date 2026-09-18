import neuronio from "@/assets/images/neuronio.png"
import notas from "@/assets/images/notas.png"
import nuvem from "@/assets/images/nuvem.png"

import type { Pilar } from "./SaibaMais.types"

export const PILARES: Pilar[] = [
    {
        titulo: "Aprendizado acessível",
        descricao: "A Orion aproxima a educação musical de quem quer aprender no próprio ritmo, com trilhas guiadas e uma experiência mais intuitiva.",
        imagem: notas,
        imagemAlt: "Notas musicais",
    },
    {
        titulo: "Cognição em movimento",
        descricao: "A prática musical estimula atenção, memória e raciocínio, criando uma ponte entre corpo, mente e aprendizado.",
        imagem: neuronio,
        imagemAlt: "Representação de neurônio",
    },
    {
        titulo: "Desenvolvimento motor",
        descricao: "Cada exercício ajuda o usuário a perceber melhor os dedos, a coordenação fina e a precisão dos gestos.",
        imagem: nuvem,
        imagemAlt: "Pessoa praticando música",
    },
]

export const ETAPAS: string[] = [
    "Escolha entre modo guiado ou livre.",
    "Defina se vai tocar com luva ou câmera.",
    "Selecione o instrumento e avance pelas atividades.",
    "Acompanhe sua evolução conforme pratica.",
]