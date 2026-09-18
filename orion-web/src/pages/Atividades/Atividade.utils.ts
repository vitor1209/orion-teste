import { lazy, type ComponentType, type LazyExoticComponent } from "react"
import type { PaginaAtividadeProps } from "./Atividade.types"

const GestoCameraManossolfa = lazy(() =>
    import("@/pages/Atividades/Manossolfa/GestoCamera/GestoCamera").then((modulo) => ({
        default: modulo.GestoCamera,
    }))
)

const EscalaDoMaiorManossolfa = lazy(() =>
    import("@/pages/Atividades/Manossolfa/EscalaDoMaior/EscalaDoMaior").then((modulo) => ({
        default: modulo.EscalaDoMaior,
    }))
)

export const REGISTRO_ATIVIDADES: Record<
    string,
    LazyExoticComponent<ComponentType<PaginaAtividadeProps>>
> = {
    "manossolfa-gesto-camera": GestoCameraManossolfa,
    "manossolfa-gesto-camera-pt2": GestoCameraManossolfa,
    "manossolfa-gesto-camera-pt3": GestoCameraManossolfa,
    "introducao-escala-do-maior-manossolfa": EscalaDoMaiorManossolfa,
}

export const montarRotaSelecaoAtividade = (busca: string) => {
    const params = new URLSearchParams(busca)

    const query = new URLSearchParams({
        modo: params.get("modo") ?? "guiado",
        interacao: params.get("interacao") ?? "luva",
        instrumento: params.get("instrumento") ?? "teclado",
    })

    return `/selecao-atividade?${query.toString()}`
}
