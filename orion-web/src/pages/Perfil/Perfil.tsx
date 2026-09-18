import { Button } from "@/components/Button/Button"
import { Box, Stack, Typography } from "@mui/material"
import { ArrowLeft, LogOut } from "lucide-react"
import * as styles from "./Perfil.styles"
import { useNavigate } from "react-router"
import { Navbar } from "@/components/Navbar/Navbar"
import { Footer } from "@/components/Footer/Footer"
import { CardSecao } from "@/components/CardSecao/CardSecao"
import { Trilha } from "@/components/Trilha/Trilha"
import { useAuth } from "@/hooks/auth/auth.hook"
import { usePerfil } from "./Perfil.hook"
import { ETAPAS_PEDIDO } from "./Perfil.utils"

export const Perfil = () => {
    const navigate = useNavigate()
    const { sair, usuario } = useAuth()
    const { perfil } = usePerfil()

    const deslogar = () => {
        sair()
        navigate("/")
    }

    return (
        <>
            <Navbar />

            <Stack sx={styles.conteudo}>
                <Box sx={styles.acaoTopo}>
                    <Stack direction="row" sx={{ gap: 1.5 }}>
                        <Button variante="Voltar" tamanho="md" icon={ArrowLeft} onClick={() => navigate(-1)}>
                            Voltar
                        </Button>

                        <Button variante="Vermelho" tamanho="md" icon={LogOut} onClick={deslogar}>
                            Sair
                        </Button>
                    </Stack>
                </Box>

                <Typography sx={styles.titulo}>Meu Perfil</Typography>

                <CardSecao titulo={usuario?.nome ?? "-"} imagem={perfil.avatar} >
                    <Stack sx={{ gap: 0.5 }}>
                        <Typography sx={styles.rotuloEmail}>Email cadastrado:</Typography>
                        <Typography sx={styles.valorEmail}>{usuario?.email ?? "-"}</Typography>
                    </Stack>
                </CardSecao>

                <Typography variant="h5" sx={{ fontWeight: "fontWeightBold", mb: 2}}>
                    Acompanhe seu pedido
                </Typography>

                <CardSecao mostrarAvatar={false} titulo={"Luva ORION"} descricao={`#${perfil.id}`} >
                    <Trilha etapas={ETAPAS_PEDIDO} />
                </CardSecao>

            </Stack >

            <Footer />
        </>
    )
}