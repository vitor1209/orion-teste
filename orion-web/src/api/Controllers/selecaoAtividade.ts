import { useQuery } from "@tanstack/react-query"
import {
    SelecaoAtividadeQueryKeys,
    type ObterAtividades,
    type ObterRegistroAtividades,
} from "../models/SelecaoAtividade.types"
import { api } from "../Axios"


export const useObterAtividades = () => {
    return useQuery({
        queryKey: [SelecaoAtividadeQueryKeys.ObterAtividades],

        queryFn: async () => {
            const { data: response } = await api.get<ObterAtividades.Response>(
                "/api/v1/atividade/")

            return response
        },
    })
}

export const useObterRegistroAtividades = (request: ObterRegistroAtividades.Request) => {
    return useQuery({
        queryKey: [SelecaoAtividadeQueryKeys.ObterRegistroAtividades, request],
        enabled: Boolean(request.usuarioId),

        queryFn: async () => {
            const { data: response } = await api.get<ObterRegistroAtividades.Response>(
                `/api/v1/registro-atividade/por-usuario/${request.usuarioId}`,
            )

            return response
        },
    })
}

