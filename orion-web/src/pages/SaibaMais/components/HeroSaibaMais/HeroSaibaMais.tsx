import { ShoppingBag } from "lucide-react"
import { Box, Typography } from "@mui/material"
import { acoes, heroCopy, heroDescription, heroDivider, heroTitle, hero } from "./HeroSaibaMais.styles"
import { Button } from "../../../../components/Button/Button"
import { FundoEstrelado } from "../../../../components/FundoEstrelado/FundoEstrelado"

export const HeroSaibaMais = () => {
    return (
        <FundoEstrelado variante="secao" id="topo" className="home-hero" sx={hero}>

            <Box className="saiba-hero-copy" sx={heroCopy}>
                <Typography sx={heroTitle}>Aprender música pode ser mais intuitivo.</Typography>

                <Typography sx={heroDescription}>
                    A ORION combina prática guiada, interação visual e tecnologia para tornar o primeiro contato com instrumentos mais simples,
                    progressivo e divertido.
                </Typography>

                <Box sx={acoes}>
                    <Button tamanho="lg" variante="Gradiente" to="/selecao-modo?modo=guiado">
                        Começar a praticar
                    </Button>
                    <Button tamanho="lg" variante="Branco" to="/loja" icon={ShoppingBag}>
                        Conhecer a luva
                    </Button>
                </Box>
            </Box>

            <Box className="saiba-hero-divider" aria-hidden="true" sx={heroDivider} />
        </FundoEstrelado>
    )
}