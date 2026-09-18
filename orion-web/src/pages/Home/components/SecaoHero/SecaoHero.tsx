import { Box, Typography } from "@mui/material"
import luva from "@/assets/images/luva.png"
import type { SecaoHeroProps } from "./SecaoHero.types"
import * as styles from "./SecaoHero.styles"
import { FundoEstrelado } from "../../../../components/FundoEstrelado/FundoEstrelado"
import { TextoGradiente } from "../../../../components/TextoGradiente/TextoGradiente"
import { Button } from "../../../../components/Button/Button"

export const SecaoHero = ({ aoClicarComoFunciona, aoClicarPratique }: SecaoHeroProps) => {
    return (
        <FundoEstrelado variante="secao" id="topo" className="home-hero" sx={styles.wrapper}>
            <Box sx={styles.conteudo}>
                <Typography sx={styles.titulo} className="home-hero-title">
                    Aprenda
                    <br />
                    música com as
                    <br />
                    <TextoGradiente>suas próprias mãos</TextoGradiente>
                </Typography>

                <Typography sx={styles.descricao} className="home-hero-description">
                    Uma plataforma inteligente que transforma cada toque em aprendizado,
                    conectando tecnologia e educação musical de forma interativa.
                </Typography>

                <Box sx={styles.containerBotoes} className="home-hero-actions">
                    <Button variante="Branco" tamanho="lg" onClick={aoClicarComoFunciona}>
                        Como funciona
                    </Button>
                    <Button variante="Gradiente" tamanho="lg" onClick={aoClicarPratique}>
                        Começar agora
                    </Button>
                </Box>
            </Box>

            <Box sx={styles.containerImagem} className="home-hero-image">
                <Box component="img" alt="Luva Orion" src={luva} sx={styles.imagem} />
            </Box>
        </FundoEstrelado>
    )
}