import { Box } from "@mui/material"
import { useIndicadorProgressoScroll } from "./IndicadorProgressoScroll.hook"
import type { IndicadorProgressoScrollProps } from "./IndicadorProgressoScroll.types"
import * as styles from "./IndicadorProgressoScroll.styles"

export const IndicadorProgressoScroll = (props: IndicadorProgressoScrollProps) => {
    const { progresso, proporcaoVisivel } = useIndicadorProgressoScroll(props)

    const alturaPercentual = proporcaoVisivel * 100
    const topoPercentual = progresso * (100 - alturaPercentual)

    return (
        <Box sx={styles.trilha}>
            <Box sx={styles.preenchimento(topoPercentual, alturaPercentual)} />
        </Box>
    )
}
