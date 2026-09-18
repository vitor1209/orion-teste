import type { Atividade } from "@/api/models/SelecaoAtividade.types"
import type { FluxoParams } from "./SelecaoAtividade.types"

export const montarRotaAnterior = (modo: string, interacao: string) => {
    const params = new URLSearchParams({ modo, interacao })
    return `/selecao-modo?${params.toString()}`
}

export const montarRotaAtividade = (chave: string, fluxo: FluxoParams) => {
    const query = new URLSearchParams(fluxo)
    return `/atividade/${encodeURIComponent(chave)}?${query.toString()}`
}

export const ordenarPorOrdem = <T extends Pick<Atividade, "ordem">>(atividades: T[]) =>
    atividades.toSorted((primeira, segunda) => primeira.ordem - segunda.ordem)
