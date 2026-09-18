import { Box, Typography } from "@mui/material"
import { Camera } from "@/components/Camera/Camera"
import { Partitura } from "@/components/Partitura/Partitura"
import { LayoutSessao } from "@/components/LayoutSessao/LayoutSessao"
import { ExplicacaoAtividade } from "@/pages/Atividades/components/ExplicacaoAtividade/ExplicacaoAtividade"
import { AtividadeConcluida } from "@/pages/Atividades/components/AtividadeConcluida/AtividadeConcluida"
import type { PaginaAtividadeProps } from "@/pages/Atividades/Atividade.types"
import { OverlayConfirmacaoGesto } from "../components/OverlayConfirmacaoGesto/OverlayConfirmacaoGesto"
import { useEscalaDoMaior } from "./EscalaDoMaior.hook"
import { FaseEscalaDoMaior } from "./EscalaDoMaior.types"
import { DURACAO_CONFIRMACAO_SEGUNDOS, NOTAS_ESCALA_DO_MAIOR } from "./EscalaDoMaior.utils"

export const EscalaDoMaior = ({ atividade, rotaVoltar }: PaginaAtividadeProps) => {
    const {
        fase,
        nivel,
        isStreamActive,
        sessionKey,
        ultimaNota,
        statusNotas,
        mensagemErro,
        rotaVoltarFinal,
        contagem,
        emConfirmacao,
        tentativaConfirmacao,
        iniciarPratica,
        iniciarSessao,
        pararSessao,
    } = useEscalaDoMaior({ atividade, rotaVoltar })

    if (fase === FaseEscalaDoMaior.Introducao) {
        return (
            <ExplicacaoAtividade
                titulo={atividade?.titulo ?? "Introdução a escala de Dó Maior"}
                subTitulo={atividade?.subTitulo ?? "Primeiros passos na música - conhecendo a escala de Dó Maior"}
                descricao={
                    atividade?.descricao ??
                    "Nesta atividade você vai fazer o gesto de cada nota da escala de Dó Maior, avançando conforme cada gesto for reconhecido."
                }
                nivel={nivel}
                onAvancar={iniciarPratica}
            />
        )
    }

    if (fase === FaseEscalaDoMaior.Concluida) {
        return (
            <AtividadeConcluida
                rotaVoltar={rotaVoltarFinal}
                atividadeId={atividade?.id}
                titulo="Você completou a escala!"
                descricao="Você fez o gesto de todas as notas da escala de Dó Maior."
            />
        )
    }

    return (
        <LayoutSessao
            rotaVoltar={rotaVoltarFinal}
            eyebrow={atividade?.categoria ?? "Escala"}
            titulo={atividade?.titulo ?? "Introdução a escala de Dó Maior"}
            subtitulo={atividade?.subTitulo ?? "Faça o gesto de cada nota da escala de Dó Maior"}
        >
            <Box key={sessionKey} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
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

                <Partitura notas={NOTAS_ESCALA_DO_MAIOR} statusNotas={statusNotas} />

                {mensagemErro && (
                    <Typography sx={{ color: "error.main", fontSize: "0.9rem" }}>{mensagemErro}</Typography>
                )}
            </Box>
        </LayoutSessao>
    )
}
