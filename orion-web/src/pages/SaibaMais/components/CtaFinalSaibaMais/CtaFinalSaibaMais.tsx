import { Box, Typography } from "@mui/material"
import { acoes, descricao, eyebrow, secao, titulo } from "./CtaFinalSaibaMais.styles"
import { Button } from "../../../../components/Button/Button"

export const CtaFinalSaibaMais = () => {
    return (
        <Box className="saiba-reveal" sx={secao}>
            <Typography sx={eyebrow}>Pronto para experimentar?</Typography>
            <Typography sx={titulo}>Comece pela trilha que combina com você.</Typography>
            <Typography sx={descricao}>Escolha um modo, teste a experiência e avance no seu ritmo.</Typography>

            <Box sx={acoes}>
                <Button tamanho="lg" variante="Gradiente" to="/selecao-modo?modo=guiado">
                    Modo Guiado
                </Button>
                <Button tamanho="lg" variante="Branco" to="/selecao-modo?modo=livre">
                    Modo Livre
                </Button>
            </Box>
        </Box>
    )
}