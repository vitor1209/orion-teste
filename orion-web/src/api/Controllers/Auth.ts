import { useMutation } from "@tanstack/react-query"
import type { Cadastrar, Entrar } from "../models/Auth.types"
import { api } from "../Axios"
import { toast } from "sonner"
import { useAuth } from "@/hooks/auth/auth.hook"

export const useEntrar = () => {
    const { entrar: definirUsuarioAutenticado } = useAuth()

    return useMutation({
        mutationFn: async (request: Entrar.Request) => {
            const { data } = await api.post<Entrar.Response>(
                "/auth/login",
                request
            )

            return data
        },

        onSuccess: (data) => {
            definirUsuarioAutenticado(
                { userId: data.userId, nome: data.nome, email: data.email },
                data.accessToken
            )
            toast.success("Login realizado com sucesso", {
                description: "Bem-vindo(a) de volta, " + data.nome + "!",
            })
        },

        onError: () => {
            toast.error("Erro ao entrar", {
                description: "E-mail ou senha inválidos.",
            })
        },
    })
}

export const useCadastrar = () => {
    return useMutation({
        mutationFn: async (request: Cadastrar.Request) => {
            const { data } = await api.post<Cadastrar.Response> ("/usuario/", request)
            
            return data
        },

        onSuccess: () => {
            toast.success("Cadastro realizado com sucesso", {
                description: "Realize o login para acessar sua conta.",
            })
        },

        onError: () => {
            toast.error("Erro ao cadastrar", {
                description: "Tente novamente mais tarde.",
            })
        },
    })
}
