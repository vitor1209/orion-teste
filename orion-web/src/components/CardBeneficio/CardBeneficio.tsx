import { Box, Typography } from "@mui/material"
import type { CardBeneficioProps } from "./CardBeneficio.types"
import * as styles from "./CardBeneficio.styles"

export const CardBeneficio = ({
    variante = "beneficio",
    titulo,
    descricao,
    icon: Icon,
    imagem,
    imagemAlt,
    className,
}: CardBeneficioProps) => {
    return (
        <Box sx={styles.card(variante)} className={className}>
            {variante === "pilar" ? (
                <Box sx={styles.molduraImagem}>
                    <Box component="img" src={imagem} alt={imagemAlt} sx={styles.imagem} />
                </Box>
            ) : (
                Icon && (
                    <Box sx={styles.icone}>
                        <Icon size={26} />
                    </Box>
                )
            )}
            <Typography sx={styles.titulo(variante)}>{titulo}</Typography>
            <Typography sx={styles.descricao(variante)}>{descricao}</Typography>
        </Box>
    )
}
