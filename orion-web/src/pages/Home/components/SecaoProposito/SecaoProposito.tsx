import { Box, Stack, Typography } from "@mui/material"
import logoOrion from "@/assets/images/logo.png"
import { FUNCIONALIDADES } from "./SecaoProposito.utils"
import * as styles from "./SecaoProposito.styles"
import { ItemFuncionalidade } from "../../../../components/ItemFuncionalidade/ItemFuncionalidade"

export const SecaoProposito = () => {
    return (
        <Box component="section" id="proposito" sx={styles.secao}>
            <Stack sx={styles.cabecalho} className="home-reveal">
                <Typography sx={styles.titulo}>Nosso Propósito</Typography>
                <Typography sx={styles.subtitulo}>
                    Unir tecnologia e educação para criar experiências de aprendizado musical
                    imersivas, divertidas e eficazes para todas as idades.
                </Typography>
                <Box component="img" src={logoOrion} alt="ORION" sx={styles.logo} />
            </Stack>

            <Stack sx={styles.listaFuncionalidades}>
                {FUNCIONALIDADES.map((funcionalidade) => (
                    <ItemFuncionalidade
                        key={funcionalidade.id}
                        titulo={funcionalidade.titulo}
                        descricao={funcionalidade.descricao}
                        imagem={funcionalidade.imagem}
                        textoAlternativoImagem={funcionalidade.textoAlternativoImagem}
                        inverter={funcionalidade.inverter}
                        linkBotao="/saiba-mais"
                        textoBotao="Saiba mais"
                    />
                ))}
            </Stack>
        </Box>
    )
}