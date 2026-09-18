import { Fragment } from "react"
import { Box, Stack, Typography } from "@mui/material"
import type { TrilhaProps } from "./Trilha.types"
import * as styles from "./Trilha.styles"

export const Trilha = ({ etapas, className }: TrilhaProps) => {
    return (
        <Box sx={styles.trilha} className={className}>
            {etapas.map((etapa, indice) => {
                const Icon = etapa.icon
                const ultima = indice === etapas.length - 1
                const proximaConcluida = etapas[indice + 1]?.concluida ?? false

                return (
                    <Fragment key={etapa.titulo}>
                        <Stack sx={styles.coluna}>
                            <Box sx={styles.icone(etapa.concluida)}>
                                <Icon size={33} strokeWidth={1.8} />
                            </Box>

                            <Box>
                                <Typography sx={styles.titulo}>{etapa.titulo}</Typography>
                                <Typography sx={styles.legenda}>{etapa.legenda}</Typography>
                                <Typography sx={styles.data}>{etapa.data}</Typography>
                            </Box>
                        </Stack>

                        {!ultima && <Box sx={styles.conector(etapa.concluida && proximaConcluida)} />}
                    </Fragment>
                )
            })}
        </Box>
    )
}
