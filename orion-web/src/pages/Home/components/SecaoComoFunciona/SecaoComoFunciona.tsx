import { Box, Container, Stack, Typography } from "@mui/material"
import fundoPartitura from "@/assets/images/fundo_partitura.png"
import { PASSOS } from "./SecaoComoFunciona.utils"
import * as styles from "./SecaoComoFunciona.styles"
import { CardPassos } from "../../../../components/CardPassos/CardPassos"

export const SecaoComoFunciona = () => {
    return (
        <Box component="section" id="como-funciona" sx={styles.secao}>
            <Box sx={styles.camadaFundo(fundoPartitura)} />

            <Box
                component="svg"
                sx={styles.camadaOnda}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                aria-label="Efeito de onda"
            >
                <path
                    fill="#0C1528"
                    fillOpacity="1"
                    d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,133.3C1120,139,1280,117,1360,106.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
                />
            </Box>

            <Container sx={styles.container}>
                <Stack sx={styles.cabecalho} className="home-reveal">
                    <Typography sx={styles.eyebrow}>Como funciona</Typography>
                    <Typography sx={styles.titulo}>Aprenda música passo a passo</Typography>
                    <Typography sx={styles.subtitulo}>
                        Uma experiência simples, visual e interativa para você dominar cada
                        movimento com confiança.
                    </Typography>
                </Stack>

                <Box sx={styles.gradePassos} className="home-steps-grid">
                    {PASSOS.map((passo, index) => (
                        <Box className="home-step-card" key={passo.numero}>
                            <CardPassos
                                numero={passo.numero}
                                titulo={passo.titulo}
                                descricao={passo.descricao}
                                nivel={(index + 1) as 1 | 2 | 3 | 4}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}