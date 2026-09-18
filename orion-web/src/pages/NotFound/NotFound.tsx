import { Home } from "lucide-react"
import { Stack, Typography } from "@mui/material"
import { Button } from "@/components/Button/Button"
import { FundoEstrelado } from "@/components/FundoEstrelado/FundoEstrelado"
import * as styles from "./NotFound.styles"

export const NotFound = () => {
    return (
        <FundoEstrelado variante="tela" comBrilhoCentral sx={styles.pagina}>
            <Stack sx={{ alignItems: "center", gap: "18px" }}>
                <Typography sx={styles.codigo}>404</Typography>
                <Typography sx={styles.titulo}>Página não encontrada</Typography>
                <Typography sx={styles.subtitulo}>
                    O endereço acessado não existe ou foi movido. Volte para a página inicial para continuar.
                </Typography>

                <Button variante="Gradiente" tamanho="lg" icon={Home} to="/">
                    Voltar para o início
                </Button>
            </Stack>
        </FundoEstrelado>
    )
}
