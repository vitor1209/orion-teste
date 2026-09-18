import { Box, Typography } from "@mui/material"
import { useCameraPage } from "./Camera.hook"
import { useNotaSound } from "@/hooks/useNotaSound/useNotaSound.hook"
import { useNotes } from "@/hooks/useNotes/useNotes.hook"
import { LayoutSessao } from "@/components/LayoutSessao/LayoutSessao"
import { Camera } from "@/components/Camera/Camera"
import { Partitura } from "@/components/Partitura/Partitura"
import type { PaginaAtividadeProps } from "@/pages/Atividades/Atividade.types"

export const CameraPage = ({ atividade, rotaVoltar }: PaginaAtividadeProps) => {
    const {
        isStreamActive,
        wsAtivo,
        sessionKey,
        rotaVoltar: rotaVoltarPadrao,
        iniciarSessao,
        pararSessao,
    } = useCameraPage()
    const { ultimaNota, listaNotas, limparNotas, removerUltimaNota, statusConexao } = useNotes(wsAtivo)
    useNotaSound({ notas: ultimaNota })

    return (
        <LayoutSessao
            rotaVoltar={rotaVoltar ?? rotaVoltarPadrao}
            eyebrow={atividade?.categoria ?? "Modo Livre"}
            titulo={atividade?.titulo ?? "Faça os gestos da manossolfa para a câmera."}
            subtitulo={
                atividade?.descricao ??
                "Com base nos ensinamentos da parte teórica, toque com sua luva as notas correspondentes dessa partitura"
            }
        >
            <Box key={sessionKey} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                <Typography sx={{ fontSize: { xs: "0.84rem", sm: "0.9rem" }, color: "#888888", lineHeight: 1.6 }}>
                    Conexão WS: {statusConexao}
                </Typography>

                <Box sx={{ borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", width: "100%" }}>
                    <Camera isStreamActive={isStreamActive} onStart={iniciarSessao} onStop={pararSessao} ultimaNota={ultimaNota} />
                </Box>

                <Partitura notas={listaNotas} onClear={limparNotas} onRemoverUltimaNota={removerUltimaNota} />
            </Box>
        </LayoutSessao>
    )
}
