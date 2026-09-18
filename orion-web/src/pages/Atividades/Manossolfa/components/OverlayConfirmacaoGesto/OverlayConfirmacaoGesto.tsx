import { Box, Typography } from "@mui/material"
import type { OverlayConfirmacaoGestoProps } from "./OverlayConfirmacaoGesto.types"
import * as styles from "./OverlayConfirmacaoGesto.styles"

export const OverlayConfirmacaoGesto = ({ contagem, duracaoSegundos }: OverlayConfirmacaoGestoProps) => (
    <Box sx={styles.overlayConfirmacao(duracaoSegundos)}>
        <Typography sx={styles.contadorConfirmacao}>{contagem}</Typography>
    </Box>
)
