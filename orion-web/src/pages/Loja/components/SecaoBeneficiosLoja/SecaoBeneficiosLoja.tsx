import { Box, Typography } from "@mui/material"
import { BENEFICIOS_LOJA } from "./SecaoBeneficiosLoja.utils"
import * as styles from "./SecaoBeneficiosLoja.styles"
import { CardBeneficio } from "@/components/CardBeneficio/CardBeneficio"

export const SecaoBeneficiosLoja = () => {
    return (
        <Box component="section" sx={styles.secao}>
            <Box sx={styles.cabecalho} className="store-benefits-header">
                <Typography sx={styles.eyebrow}>Por que escolher a ORION?</Typography>
                <Typography sx={styles.titulo}>Uma experiência musical mais inteligente</Typography>
            </Box>

            <Box sx={styles.grade} className="store-benefits-grid">
                {BENEFICIOS_LOJA.map((beneficio) => (
                    <CardBeneficio
                        key={beneficio.titulo}
                        icon={beneficio.icon}
                        titulo={beneficio.titulo}
                        descricao={beneficio.descricao}
                        className="store-benefit-card"
                    />
                ))}
            </Box>
        </Box>
    )
}