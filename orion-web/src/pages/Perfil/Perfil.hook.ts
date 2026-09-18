import { useObterPerfil } from "@/api/Controllers/Perfil"
import type { Perfil } from "@/api/models/Perfil.types"

const PERFIL_INICIAL: Perfil = {
    id: "",
    usuario: "",
    nome: "",
    email: "",
}

export const usePerfil = () => {
    const { data } = useObterPerfil()
    const perfil = data ?? PERFIL_INICIAL

    return { perfil }
}
