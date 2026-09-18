import { Box, Typography } from "@mui/material"
import ondaSonora from "@/assets/videos/onda-sonora.mp4"
import logo from "@/assets/images/logo-practice.png"
import * as styles from "./SecaoPratique.styles"
import { Button } from "../../../../components/Button/Button"
import { TextoGradiente } from "../../../../components/TextoGradiente/TextoGradiente"

export const SecaoPratique = () => {
    return (
        <Box
            component="section"
            id="pratique"
            className="home-practice-section"
            sx={styles.secao}
        >
            <Box sx={styles.wrapperVideo}>
                <Box component="video" autoPlay muted loop playsInline sx={styles.video}>
                    <source src={ondaSonora} type="video/mp4" />
                </Box>
            </Box>

            <Box sx={styles.conteudo} className="home-practice-content">
                <Typography sx={styles.titulo}>
                    Pratique <TextoGradiente>agora!</TextoGradiente>
                </Typography>

                <Typography sx={styles.descricao}>
                    Escolha seu modo preferido e comece a explorar o mundo da música com
                </Typography>

                <Box component="img" src={logo} alt="Logo Orion" sx={styles.logo} />

                <Box sx={styles.linhaBotoes}>
                    <Button tamanho="lg" to="/selecao-modo?modo=guiado">
                        Modo Guiado
                    </Button>
                    <Button variante="Gradiente" tamanho="lg" to="/selecao-modo?modo=livre">
                        Modo Livre
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}