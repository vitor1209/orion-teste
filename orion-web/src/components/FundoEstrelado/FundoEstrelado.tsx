import { Box } from "@mui/material"
import type { FundoEstreladoProps } from "./FundoEstrelado.types"
import * as styles from "./FundoEstrelado.styles"

export const FundoEstrelado = ({
    variante = "secao",
    comBrilhoCentral = false,
    id,
    className,
    sx,
    children,
}: FundoEstreladoProps) => {
    return (
        <Box
            id={id}
            className={className}
            sx={[styles.container(variante), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        >
            {comBrilhoCentral && <Box sx={styles.brilhoCentral} />}
            {children}
        </Box>
    )
}