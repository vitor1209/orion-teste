import { ArrowLeft } from "lucide-react"
import { Box, Stack, Typography } from "@mui/material"

import { Button } from "../Button/Button"
import { Footer } from "../Footer/Footer"
import { ModalConfirmarSaida } from "@/components/ModalConfirmarSaida/ModalConfirmarSaida"

import { useLayoutSessao } from "./LayoutSessao.hook"
import type { LayoutSessaoProps } from "./LayoutSessao.types"
import { botaoVoltarWrapper, cartaoModal, eyebrow, subtitulo, titulo, wrapper } from "./LayoutSessao.styles"

export const LayoutSessao = ({ rotaVoltar, eyebrow: textoEyebrow, titulo: textoTitulo, subtitulo: textoSubtitulo, children }: LayoutSessaoProps) => {
    const { modalSaidaAberto, abrirModalSaida, fecharModalSaida, confirmarSaida } = useLayoutSessao(rotaVoltar)

    return (
        <Box sx={wrapper}>
            <Box sx={botaoVoltarWrapper}>
                <Button variante="Voltar" tamanho="md" icon={ArrowLeft} ladoIcon="esquerda" onClick={abrirModalSaida}>
                    Voltar
                </Button>
            </Box>

            <Stack sx={cartaoModal}>
                <Typography sx={eyebrow}>{textoEyebrow}</Typography>
                <Typography sx={titulo}>{textoTitulo}</Typography>
                <Typography sx={subtitulo}>{textoSubtitulo}</Typography>

                {children}
            </Stack>

            <Footer />

            <ModalConfirmarSaida aberto={modalSaidaAberto} aoConfirmar={confirmarSaida} aoCancelar={fecharModalSaida} />
        </Box>
    )
}