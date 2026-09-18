import { Box, Typography } from "@mui/material"
import { CardBeneficio } from "@/components/CardBeneficio/CardBeneficio"
import type { PilaresSaibaMaisProps } from "./PilaresSaibaMais.types"
import { cabecalho, descricao, eyebrow, grade, secao, titulo } from "./PilaresSaibaMais.styles"

export const PilaresSaibaMais = ({ pilares }: PilaresSaibaMaisProps) => {
    return (
        <Box sx={secao}>
            <Box className="saiba-reveal" sx={cabecalho}>
                <Typography sx={eyebrow}>Nosso propósito</Typography>
                <Typography sx={titulo}>Mais do que tocar notas</Typography>
                <Typography sx={descricao}>
                    A ORION foi pensada para unir acessibilidade, desenvolvimento cognitivo e coordenação motora em uma experiência de aprendizado
                    musical mais próxima do usuário.
                </Typography>
            </Box>

            <Box className="saiba-pillars-grid" sx={grade}>
                {pilares.map((pilar) => (
                    <CardBeneficio
                        key={pilar.titulo}
                        variante="pilar"
                        titulo={pilar.titulo}
                        descricao={pilar.descricao}
                        imagem={pilar.imagem}
                        imagemAlt={pilar.imagemAlt}
                        className="saiba-pillar-card"
                    />
                ))}
            </Box>
        </Box>
    )
}
