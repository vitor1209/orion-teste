import { Box, Chip, Typography } from "@mui/material"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/Button/Button"
import { Footer } from "@/components/Footer/Footer"
import { ModalConfirmarSaida } from "@/components/ModalConfirmarSaida/ModalConfirmarSaida"
import { IndicadorProgressoScroll } from "./components/IndicadorProgressoScroll/IndicadorProgressoScroll"
import { useExplicacaoAtividade } from "./ExplicacaoAtividade.hook"
import type { ExplicacaoAtividadeProps } from "./ExplicacaoAtividade.types"
import * as styles from "./ExplicacaoAtividade.styles"

export const ExplicacaoAtividade = ({ titulo, subTitulo, descricao, nivel, onAvancar }: ExplicacaoAtividadeProps) => {
    const { refCard, modalSaidaAberto, abrirModalSaida, fecharModalSaida, confirmarSaida } = useExplicacaoAtividade()

    return (
        <Box sx={styles.wrapper}>

            <Box sx={styles.acaoTopo}>
                <Button variante="Voltar" tamanho="md" icon={ArrowLeft} onClick={abrirModalSaida}>
                    Voltar
                </Button>
            </Box>

            <Box sx={styles.conteudo}>
                <Box sx={styles.cabecalho}>
                    <Box sx={styles.barraTitulo} />
                    <Typography sx={styles.titulo}>{titulo}</Typography>
                </Box>

                <Chip label={nivel} size="small" sx={styles.chipNivel} />

                <Box sx={styles.card}>
                    <Box ref={refCard} sx={styles.areaRolavel}>
                        <Typography sx={styles.eyebrow}>Parte teórica</Typography>
                        <Typography sx={styles.subTitulo}>{subTitulo}</Typography>
                        <Typography sx={styles.descricao}>{descricao}</Typography>
                    </Box>

                    <IndicadorProgressoScroll refCard={refCard} />

                    <Button
                        variante="Icone"
                        tamanho="xl"
                        icon={ArrowRight}
                        aria-label="Avançar para a atividade"
                        onClick={onAvancar}
                        sx={styles.botaoAvancar}
                    />
                </Box>
            </Box>

            <Footer />

            <ModalConfirmarSaida aberto={modalSaidaAberto} aoConfirmar={confirmarSaida} aoCancelar={fecharModalSaida} />
        </Box>
    )
}
