import { useAuth } from "@/hooks/auth/auth.hook"
import { useEffect, useState } from "react"

export const useNavbar = () => {

    const { autenticado } = useAuth()

    const [menuAberto, setMenuAberto] = useState(false)
    const [estaNoTopo, setEstaNoTopo] = useState(true)

    const abrirMenu = () => setMenuAberto(true)
    const fecharMenu = () => setMenuAberto(false)

    useEffect(() => {
        const atualizarEstadoDoTopo = () => {
            setEstaNoTopo(window.scrollY < 16)
        }

        atualizarEstadoDoTopo()
        window.addEventListener("scroll", atualizarEstadoDoTopo, { passive: true })

        return () => {
            window.removeEventListener("scroll", atualizarEstadoDoTopo)
        }
    }, [])

    return { menuAberto, estaNoTopo, abrirMenu, fecharMenu, autenticado }
}