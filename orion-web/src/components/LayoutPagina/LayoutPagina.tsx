import { Box, Stack, Typography } from "@mui/material"

import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"

import type { LayoutPaginaProps } from "./LayoutPagina.types"
import { inner, main, subtitulo as estiloSubtitulo, titulo as estiloTitulo, wrapper } from "./LayoutPagina.styles"

export const LayoutPagina = ({ tagline, rotaVoltar, titulo, subtitulo, children }: LayoutPaginaProps) => {
    return (
        <Box sx={wrapper}>
            <Stack sx={inner}>
                <Header tagline={tagline} rotaVoltar={rotaVoltar} />

                <Stack component="main" sx={main} >
                    <Typography component="h1" sx={estiloTitulo}>
                        {titulo}
                    </Typography>
                    <Typography component="p" sx={estiloSubtitulo}>
                        {subtitulo}
                    </Typography>

                    {children}
                </Stack>
            </Stack>

            <Footer />
        </Box>
    )
}