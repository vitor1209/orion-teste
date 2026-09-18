import { ArrowLeft } from "lucide-react"
import { Box, Stack } from "@mui/material"
import { Button } from "@/components/Button/Button"
import { FundoEstrelado } from "@/components/FundoEstrelado/FundoEstrelado"
import { Abas } from "@/components/Abas/Abas"
import logo from "@/assets/images/logo.png"
import constelacaoOrion from "@/assets/images/constelacao_orion.png"
import lua from "@/assets/images/lua.png"
import { useAuth } from "./Auth.hook"
import { Login } from "./tabs/Login/Login"
import { Cadastro } from "./tabs/Cadastro/Cadastro"
import type { AbaAuth } from "./Auth.types"
import * as styles from "./Auth.styles"

const ABAS_AUTH: { valor: AbaAuth; rotulo: string }[] = [
    { valor: "entrar", rotulo: "Entrar" },
    { valor: "cadastro", rotulo: "Cadastre-se" },
]

export const Auth = () => {
    const { abaAtiva, alterarAba } = useAuth()

    return (
        <FundoEstrelado variante="tela" comBrilhoCentral sx={styles.pagina}>
            <Box sx={styles.wrapperBotaoVoltar}>
                <Button variante="Voltar" tamanho="md" icon={ArrowLeft} to="/">
                    Voltar
                </Button>
            </Box>

            <Box component="img" src={constelacaoOrion} alt="" aria-hidden="true" sx={styles.constelacao} />
            <Box component="img" src={lua} alt="" aria-hidden="true" sx={styles.lua} />

            <Stack sx={styles.cartao}>
                <Abas abas={ABAS_AUTH} valorSelecionado={abaAtiva} aoAlterar={alterarAba} sx={styles.abas} />

                <Box component="img" src={logo} alt="Orion" sx={styles.logo} />

                {abaAtiva === "cadastro" ? <Cadastro /> : <Login />}
            </Stack>
        </FundoEstrelado>
    )
}
