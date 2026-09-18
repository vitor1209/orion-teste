import { Box, Stack, Typography } from "@mui/material"
import type { CardPassosProps } from "./CardPassos.types"
import * as styles from "./CardPassos.styles"

export const CardPassos = ({ numero, titulo, descricao, nivel = 1 }: CardPassosProps) => {
    return (
        <Box sx={styles.cartao(nivel)}>
            <Stack sx={styles.numero}>{numero}</Stack>
            <Typography sx={styles.titulo(nivel)}>{titulo}</Typography>
            <Typography sx={styles.descricao(nivel)}>{descricao}</Typography>
        </Box>
    )
}
