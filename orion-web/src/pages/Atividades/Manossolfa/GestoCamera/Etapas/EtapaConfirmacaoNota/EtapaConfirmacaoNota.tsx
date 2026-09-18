import { Box, Typography } from "@mui/material"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/Button/Button"
import type { NotaEnsinada } from "../../GestoCamera.types"
import * as stylesGestoCamera from "../../GestoCamera.styles"
import * as styles from "./EtapaConfirmacaoNota.styles"

export type EtapaConfirmacaoNotaProps = {
    notaEnsinada: NotaEnsinada
    proximaNotaEnsinada?: NotaEnsinada
    onProximo: () => void
}

export const EtapaConfirmacaoNota = ({ notaEnsinada, proximaNotaEnsinada, onProximo }: EtapaConfirmacaoNotaProps) => {
    return (
        <Box sx={stylesGestoCamera.etapaContainer}>
            <Box sx={styles.distintivoSucesso}>
                <Check size={34} />
            </Box>

            <Typography sx={styles.titulo}>Muito bem!</Typography>
            <Typography sx={styles.notaAprendida}>Nota {notaEnsinada.nomeExibicao} aprendida</Typography>

            {proximaNotaEnsinada && (
                <Typography sx={styles.textoAutoAvanco}>
                    Avançando para {proximaNotaEnsinada.nomeExibicao} em instantes...
                </Typography>
            )}

            <Button variante="Roxo" tamanho="md" icon={ArrowRight} ladoIcon="direita" onClick={onProximo}>
                Próxima nota
            </Button>
        </Box>
    )
}
