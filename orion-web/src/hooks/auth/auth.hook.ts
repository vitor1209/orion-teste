import { authAtom } from "@/utils/Auth.atom"
import { useAtom } from "jotai"

export const useAuth = () => {
    const [auth, setAuth] = useAtom(authAtom)

    const entrar = (
        usuario: typeof auth.usuario,
        token: string,
    ) => {
        setAuth({
            usuario,
            access_token: token,
            token_type: "Bearer",
        })
    }

    const sair = () => {
        setAuth({
            usuario: null,
            access_token: null,
            token_type: null,
        })
    }

    return {
        usuario: auth.usuario,
        token: auth.access_token,
        autenticado: !!auth.access_token,
        entrar,
        sair,
    }
}