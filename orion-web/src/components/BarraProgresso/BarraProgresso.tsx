import { Box, LinearProgress, Typography } from "@mui/material"
import type { BarraProgressoProps } from "./BarraProgresso.types"
import * as styles from "./BarraProgresso.styles"

export const BarraProgresso = ({ concluidas, total }: BarraProgressoProps) => {
    const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100)

    return (
        <Box sx={styles.area}>
            <Box sx={styles.marcador} />

            <Box>
                <Typography sx={styles.titulo}>Acompanhe seu progresso</Typography>
                <Typography sx={styles.subtitulo}>
                    Você concluiu {concluidas} de {total} atividades disponíveis
                </Typography>
            </Box>

            <Box sx={styles.wrapperBarra}>
                <LinearProgress variant="determinate" value={progresso} sx={styles.barra} />
                <Box sx={styles.diamante(progresso)} />
                <Typography sx={styles.valor(progresso)}>{progresso}%</Typography>
            </Box>
        </Box>
    )
}