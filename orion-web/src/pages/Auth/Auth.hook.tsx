import { useSearchParams } from "react-router"
import type { AbaAuth } from "./Auth.types"

export const useAuth = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const abaAtiva: AbaAuth = searchParams.get("aba") === "cadastro" ? "cadastro" : "entrar"

    const alterarAba = (aba: AbaAuth) => {
        setSearchParams(aba === "cadastro" ? { aba: "cadastro" } : {})
    }

    return { abaAtiva, alterarAba }
}
