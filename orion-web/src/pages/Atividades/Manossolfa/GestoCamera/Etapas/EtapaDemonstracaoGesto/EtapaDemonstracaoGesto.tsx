import { Box, Stack, Typography } from "@mui/material"
import { ArrowRight, Undo2 } from "lucide-react"
import { Button } from "@/components/Button/Button"
import { IlustracaoGesto } from "../../components/IlustracaoGesto/IlustracaoGesto"
import type { NotaEnsinada } from "../../GestoCamera.types"
import * as stylesGestoCamera from "../../GestoCamera.styles"

export type EtapaDemonstracaoGestoProps = {
    notaEnsinada: NotaEnsinada
    onAvancar: () => void
    onRetornar: () => void
}

export const EtapaDemonstracaoGesto = ({ notaEnsinada, onAvancar, onRetornar }: EtapaDemonstracaoGestoProps) => {

    return (
        <Box sx={stylesGestoCamera.etapaContainer}>

            <IlustracaoGesto variante="loop" video={notaEnsinada.video} />

            <Typography sx={stylesGestoCamera.etapaDescricao}>Observe como a mão se move.</Typography>

            <Stack direction={{ xs: "column-reverse", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 0 }, width: "100%" }}>

                <Button variante="BrancoComBorda" tamanho="md" icon={Undo2} onClick={onRetornar}>
                    Voltar
                </Button>

                <Button variante="Roxo" tamanho="md" icon={ArrowRight} ladoIcon="direita" onClick={onAvancar} sx={{ alignSelf: { xs: "stretch", sm: "flex-end" } }}>
                    Agora é sua vez
                </Button>
            </Stack>

        </Box>
    )
}
