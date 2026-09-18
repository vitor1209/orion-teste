import { useMutation } from "@tanstack/react-query"
import type { FinalizarAtividade } from "../models/Atividade.types"
import { SelecaoAtividadeQueryKeys } from "../models/SelecaoAtividade.types"
import { api } from "../Axios"
import { toast } from "sonner"
import { invalidarQueries } from "@/utils/invalidarQueries"


export const useFinalizarAtividade = () => {

    return useMutation({
        mutationFn: async (request: FinalizarAtividade.Request) => {
            const { data: response } = await api.post<FinalizarAtividade.Response>(
                "/api/v1/registro-atividade/",
                { ...request }
            )
            return response
        },
        onSuccess: async () => {
            toast.success("Atividade finalizada com sucesso!")
            await invalidarQueries([SelecaoAtividadeQueryKeys.ObterRegistroAtividades])
        },
    })
}