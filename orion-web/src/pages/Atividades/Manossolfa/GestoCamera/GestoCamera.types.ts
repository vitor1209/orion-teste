import type { NotaComOitava } from "@/utils/Notas.types"

export enum EtapaGesto {
    Explicacao = "explicacao",
    Demonstracao = "demonstracao",
    Pratica = "pratica",
    Confirmacao = "confirmacao",
}

export enum FaseGestoCamera {
    Introducao = "introducao",
    Notas = "notas",
    Concluida = "concluida",
}

export type NotaEnsinada = {
    nota: NotaComOitava
    nomeExibicao: string
    descricaoOrdinal: string
    dicaGesto: string
    imagem: string
    video: string
}
