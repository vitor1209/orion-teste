import { Box, Stack, Typography } from "@mui/material"
import { Card, conteudo, iconeModo, imagemInstrumento, wrapperImagemInstrumento } from "./CardSelecao.styled"
import type { CardSelecaoProps } from "./CardSelecao.types"

export const CardSelecao = ({ variante = "modo", titulo, descricao, icone, alt, aoClicar, larguraImagem }: CardSelecaoProps) => {
    return (
        <Stack
            sx={Card(variante)}
            role="button"
            tabIndex={0}
            onClick={aoClicar}
            onKeyDown={(evento) => {
                if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault()
                    aoClicar()
                }
            }}
        >
            <Stack sx={conteudo(variante)}>
                <Typography component="h2" sx={{ fontSize: "1.15rem", color: "#141625" }}>
                    {titulo}
                </Typography>
                <Typography component="p" sx={{ fontSize: "0.98rem", lineHeight: 1.65, color: "#5b6782" }}>
                    {descricao}
                </Typography>
            </Stack>

            {variante === "modo" ? (
                <Box component="img" src={icone} alt={alt} sx={iconeModo} />
            ) : (
                <Box sx={wrapperImagemInstrumento}>
                    <Box component="img" src={icone} alt={alt} sx={{ ...imagemInstrumento, maxWidth: larguraImagem }} />
                </Box>
            )}
        </Stack>
    )
}
