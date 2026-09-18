import { Box, Typography } from "@mui/material"
import { CheckCircle2, Lightbulb, Undo2 } from "lucide-react"
import { Camera } from "@/components/Camera/Camera"
import { Button } from "@/components/Button/Button"
import { IlustracaoGesto } from "../../components/IlustracaoGesto/IlustracaoGesto"
import { OverlayConfirmacaoGesto } from "../../../components/OverlayConfirmacaoGesto/OverlayConfirmacaoGesto"
import { useEtapaPraticaCamera } from "./EtapaPraticaCamera.hook"
import type { EtapaPraticaCameraProps } from "./EtapaPraticaCamera.types"
import { DURACAO_CONFIRMACAO_SEGUNDOS } from "./EtapaPraticaCamera.utils"
import * as stylesGestoCamera from "../../GestoCamera.styles"
import * as styles from "./EtapaPraticaCamera.styles"

export const EtapaPraticaCamera = (props: EtapaPraticaCameraProps) => {
    const {
        isStreamActive,
        ultimaNota,
        notaReconhecida,
        emConfirmacao,
        contagem,
        tentativaConfirmacao,
        iniciarSessao,
        pararSessao,
    } = useEtapaPraticaCamera(props)

    return (
        <Box sx={stylesGestoCamera.etapaContainer}>

            <Box sx={styles.linha}>
                <Box>
                    <Camera
                        isStreamActive={isStreamActive}
                        onStart={iniciarSessao}
                        onStop={pararSessao}
                        ultimaNota={ultimaNota ?? null}
                        overlay={
                            emConfirmacao && (
                                <OverlayConfirmacaoGesto
                                    key={tentativaConfirmacao}
                                    contagem={contagem ?? 0}
                                    duracaoSegundos={DURACAO_CONFIRMACAO_SEGUNDOS}
                                />
                            )
                        }
                    />
                </Box>

                <Box sx={styles.colunaReferencia}>
                    <IlustracaoGesto variante="miniatura" imagem={props.notaEnsinada.imagem} />
                </Box>

            </Box>
            <Button variante="BrancoComBorda" tamanho="md" icon={Undo2} onClick={props.onRetornar}>
                Ver demonstracao novamente
            </Button>

            {isStreamActive && emConfirmacao && (
                <Box sx={styles.feedbackAcerto}>
                    <CheckCircle2 size={18} />
                    <Typography component="span">Gesto correto! Mantenha a posição...</Typography>
                </Box>
            )}

            {isStreamActive && !notaReconhecida && (
                <Box sx={styles.cardDica}>
                    <Lightbulb size={20} color="#7C3AED" />
                    <Typography sx={styles.cardDicaTexto}>{props.notaEnsinada.dicaGesto}</Typography>
                </Box>
            )}
        </Box>
    )
}
