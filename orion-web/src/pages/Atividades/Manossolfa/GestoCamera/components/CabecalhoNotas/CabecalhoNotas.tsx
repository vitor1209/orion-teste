import { Box, Stack, Typography } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/Button/Button"
import { ModalConfirmarSaida } from "@/components/ModalConfirmarSaida/ModalConfirmarSaida"
import type { NotaEnsinada } from "../../GestoCamera.types"
import { useCabecalhoNotas } from "./CabecalhoNotas.hook"
import * as styles from "./CabecalhoNotas.styles"

export type CabecalhoNotasProps = {
    indiceNota: number
    oitava: number
    notas: NotaEnsinada[]
    rotaVoltar: string
}

export const CabecalhoNotas = ({ indiceNota, oitava, notas, rotaVoltar }: CabecalhoNotasProps) => {
    const { modalSaidaAberto, abrirModalSaida, fecharModalSaida, confirmarSaida } = useCabecalhoNotas(rotaVoltar)

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.linhaVoltar}>
                <Button variante="Voltar" tamanho="sm" icon={ArrowLeft} ladoIcon="esquerda" onClick={abrirModalSaida}>
                    Voltar
                </Button>
            </Box>

            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Stack>
                    <Typography sx={styles.titulo}>Manossolfa</Typography>
                    <Typography sx={styles.subtitulo}>Aprender os gestos</Typography>
                </Stack>
                <Stack>
                    <Typography sx={styles.titulo}>Oitava {oitava}</Typography>
                </Stack>
            </Stack>


            <Box sx={styles.pillsWrapper}>
                {notas.map((notaEnsinada, indice) => (
                    <Box key={notaEnsinada.nota} sx={styles.pill(indice === indiceNota)}>
                        {notaEnsinada.nomeExibicao}
                    </Box>
                ))}
            </Box>

            <hr />

            <ModalConfirmarSaida aberto={modalSaidaAberto} aoConfirmar={confirmarSaida} aoCancelar={fecharModalSaida} />
        </Box>
    )
}
