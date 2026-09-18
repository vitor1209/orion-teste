import { Box, Stack, Typography } from "@mui/material"
import type { ItemFuncionalidadeProps } from "./ItemFuncionalidade.types"
import * as styles from "./ItemFuncionalidade.styles"
import { Button } from "../Button/Button"

export const ItemFuncionalidade = ({
    titulo,
    descricao,
    imagem,
    textoAlternativoImagem,
    inverter = false,
    linkBotao,
    textoBotao,
}: ItemFuncionalidadeProps) => {
    return (
        <Stack
            sx={styles.item(inverter)}
            className="home-feature-item"
            data-reverse={inverter}
        >
            <Stack sx={styles.blocoTexto} className="home-feature-text">
                <Typography sx={styles.titulo}>{titulo}</Typography>
                <Typography sx={styles.descricao}>{descricao}</Typography>
                <Button variante="Preto" tamanho="md" to={linkBotao}>
                    {textoBotao}
                </Button>
            </Stack>

            <Box sx={styles.blocoImagem} className="home-feature-image">
                <Box component="img" src={imagem} alt={textoAlternativoImagem} sx={styles.imagem} />
            </Box>
        </Stack>
    )
}