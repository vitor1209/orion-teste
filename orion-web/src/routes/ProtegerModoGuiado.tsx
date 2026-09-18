import { Outlet, useNavigate, useSearchParams } from "react-router"
import { useAuth } from "@/hooks/auth/auth.hook"
import { FundoEstrelado } from "@/components/FundoEstrelado/FundoEstrelado"
import { ModalExigirLogin } from "@/components/ModalExigirLogin/ModalExigirLogin"

export const ProtegerModoGuiado = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { autenticado } = useAuth()

    const modo = searchParams.get("modo") ?? "guiado"
    const acessoBloqueado = modo === "guiado" && !autenticado

    if (acessoBloqueado) {
        return (
            <FundoEstrelado variante="tela" comBrilhoCentral>
                <ModalExigirLogin
                    aberto
                    aoIrParaInicio={() => navigate("/")}
                    aoFazerLogin={() => navigate("/login")}
                />
            </FundoEstrelado>
        )
    }

    return <Outlet />
}
