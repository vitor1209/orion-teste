import { Box, Stack } from "@mui/material"
import type { PaginaAtividadeProps } from "@/pages/Atividades/Atividade.types"
import { ExplicacaoAtividade } from "@/pages/Atividades/components/ExplicacaoAtividade/ExplicacaoAtividade"
import { CabecalhoNotas } from "./components/CabecalhoNotas/CabecalhoNotas"
import { AtividadeConcluida } from "../../components/AtividadeConcluida/AtividadeConcluida"
import { EtapaExplicacaoNota } from "./Etapas/EtapaExplicacaoNota/EtapaExplicacaoNota"
import { EtapaDemonstracaoGesto } from "./Etapas/EtapaDemonstracaoGesto/EtapaDemonstracaoGesto"
import { EtapaPraticaCamera } from "./Etapas/EtapaPraticaCamera/EtapaPraticaCamera"
import { EtapaConfirmacaoNota } from "./Etapas/EtapaConfirmacaoNota/EtapaConfirmacaoNota"
import { useGestoCamera } from "./GestoCamera.hook"
import { EtapaGesto, FaseGestoCamera } from "./GestoCamera.types"
import * as styles from "./GestoCamera.styles"
import { Footer } from "@/components/Footer/Footer"

export const GestoCamera = ({ atividade, rotaVoltar }: PaginaAtividadeProps) => {
    const {
        fase,
        etapa,
        notaAtual,
        proximaNota,
        indiceNota,
        nivel,
        oitava,
        notasManossolfa,
        rotaVoltarFinal,
        sessionKey,
        iniciarNotas,
        avancarParaDemonstracao,
        avancarParaPratica,
        confirmarGestoAprendido,
        avancarProximaNota,
        retornarParaExplicacao,
        retornarParaDemonstracao
    } = useGestoCamera({ atividade, rotaVoltar })

    if (fase === FaseGestoCamera.Introducao) {
        return (
            <ExplicacaoAtividade
                titulo={atividade?.titulo ?? "Aprenda os gestos da manossolfa"}
                subTitulo={atividade?.subTitulo ?? "Reconheça cada nota pelo gesto correspondente"}
                descricao={
                    atividade?.descricao ??
                    "Nesta atividade você vai aprender o gesto de cada nota da escala, praticar com a câmera e avançar conforme cada gesto for reconhecido."
                }
                nivel={nivel}
                onAvancar={iniciarNotas}
            />
        )
    }

    if (fase === FaseGestoCamera.Concluida) {
        return <AtividadeConcluida rotaVoltar={rotaVoltarFinal} atividadeId={atividade?.id} />
    }

    return (
        <>

            <Stack sx={styles.fundo} spacing={4}>
                <Box sx={styles.wrapper}>
                    <CabecalhoNotas indiceNota={indiceNota} oitava={oitava} notas={notasManossolfa} rotaVoltar={rotaVoltarFinal} />

                    {etapa === EtapaGesto.Explicacao && (
                        <EtapaExplicacaoNota notaEnsinada={notaAtual} onAvancar={avancarParaDemonstracao} />
                    )}
                    {etapa === EtapaGesto.Demonstracao && (
                        <EtapaDemonstracaoGesto notaEnsinada={notaAtual} onAvancar={avancarParaPratica} onRetornar={retornarParaExplicacao} />
                    )}
                    {etapa === EtapaGesto.Pratica && (
                        <EtapaPraticaCamera
                            key={sessionKey}
                            notaEnsinada={notaAtual}
                            onGestoReconhecido={confirmarGestoAprendido}
                            onRetornar={retornarParaDemonstracao}
                        />
                    )}
                    {etapa === EtapaGesto.Confirmacao && (
                        <EtapaConfirmacaoNota
                            notaEnsinada={notaAtual}
                            proximaNotaEnsinada={proximaNota}
                            onProximo={avancarProximaNota}
                        />
                    )}
                </Box>
            </Stack>
            <Footer />
        </>
    )
}
