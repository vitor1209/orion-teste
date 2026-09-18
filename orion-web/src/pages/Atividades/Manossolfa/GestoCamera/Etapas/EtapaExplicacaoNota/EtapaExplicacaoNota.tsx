import { Box, Stack, Typography } from "@mui/material"
import { ArrowRight, Volume1Icon } from "lucide-react"
import { Button } from "@/components/Button/Button"
import { IlustracaoGesto } from "../../components/IlustracaoGesto/IlustracaoGesto"
import type { NotaEnsinada } from "../../GestoCamera.types"
import * as stylesGestoCamera from "../../GestoCamera.styles"
import * as styles from "./EtapaExplicacaoNota.styles"
import { useNotaSound } from "@/hooks/useNotaSound/useNotaSound.hook"

export type EtapaExplicacaoNotaProps = {
    notaEnsinada: NotaEnsinada
    onAvancar: () => void
}

export const EtapaExplicacaoNota = ({ notaEnsinada, onAvancar }: EtapaExplicacaoNotaProps) => {
    const { play } = useNotaSound({ notas: notaEnsinada.nota })

    return (
        <Box sx={stylesGestoCamera.etapaContainer}>

            <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-around", alignItems: "center", gap: { xs: 3, md: 0 }, width: "100%", marginBottom: 4 }}>

                <Stack sx={{ gap: 2, width: { xs: "100%", md: "30%" } }}>
                    <Typography sx={stylesGestoCamera.etapaDescricao}>{notaEnsinada.descricaoOrdinal}</Typography>
                    <Typography sx={styles.nomeNota}>{notaEnsinada.nomeExibicao}</Typography>
                    <Typography sx={stylesGestoCamera.etapaDescricao}>
                        Esse gesto representa a nota {notaEnsinada.nomeExibicao}. Observe a posição da mão.
                    </Typography>

                    <Button tamanho="md" variante="BrancoComBorda" icon={Volume1Icon} onClick={() => play(notaEnsinada.nota)}>Ouvir som</Button>
                </Stack>

                <IlustracaoGesto variante="estatica" imagem={notaEnsinada.imagem} />
            </Stack>


            <Button variante="Roxo" tamanho="md" icon={ArrowRight}
                ladoIcon="direita" onClick={onAvancar} sx={{ alignSelf: "flex-end", }}>
                Ver o gesto
            </Button>

        </Box>
    )
}
