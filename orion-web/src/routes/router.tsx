import { createBrowserRouter } from "react-router"
import { Home } from "@/pages/Home/Home"
import { RolarParaTopo } from "./RolarParaTopo"
import { ProtegerModoGuiado } from "./ProtegerModoGuiado"
import { SelecaoModo } from "@/pages/SelecaoModo/SelecaoModo"
import { SelecaoInstrumento } from "@/pages/SelecaoInstrumento/SelecaoInstrumento"
import { SaibaMais } from "@/pages/SaibaMais/SaibaMais"
import { SelecaoAtividade } from "@/pages/SelecaoAtividade/SelecaoAtividade"
import { Atividade } from "@/pages/Atividades/Atividade"
import { Loja } from "@/pages/Loja/Loja"
import { FinalizarPedido } from "@/pages/FinalizarPedido/FinalizarPedido"
import { Auth } from "@/pages/Auth/Auth"
import { Perfil } from "@/pages/Perfil/Perfil"
import { NotFound } from "@/pages/NotFound/NotFound"

export const Router = createBrowserRouter([
    {
        element: <RolarParaTopo />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                element: <ProtegerModoGuiado />,
                children: [
                    {
                        path: "/selecao-modo",
                        element: <SelecaoModo />,
                    },
                    {
                        path: "/selecao-instrumento",
                        element: <SelecaoInstrumento />,
                    },
                    {
                        path: "/selecao-atividade",
                        element: <SelecaoAtividade/>
                    },
                    {
                        path: "/atividade/:chave",
                        element: <Atividade />,
                    },
                ],
            },
            {
                path: "/pratica-livre/camera",
                lazy: async () => ({
                    Component: (await import("@/pages/PraticaLivre/Camera/Camera")).CameraPage,
                }),
            },
            {
                path: "/pratica-livre/luva",
                lazy: async () => ({
                    Component: (await import("@/pages/PraticaLivre/Luva/Luva")).LuvaPage,
                }),
            },
                        {
                path: "/saiba-mais",
                element: <SaibaMais />,
            },
            {
                path: "/loja",
                element: <Loja/>
            },
            {
                path: "/finalizar-pedido",
                element: <FinalizarPedido/>
            },
            {
                path: "/login",
                element: <Auth/>
            },
            {
                path: "/perfil",
                element: <Perfil/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ],
    },
])