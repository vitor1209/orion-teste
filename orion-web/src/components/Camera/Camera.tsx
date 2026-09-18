import { Box, Stack, Typography } from "@mui/material";
import { styles } from "./Camera.styled";
import type { CameraProps } from "./Camera.types";
import { useVideoStream } from "../../hooks/useVideoStream/useVideoStream.hook";
import { Button } from "../Button/Button";
import { useMemo } from "react";

const STATUS_COR: Record<string, string> = {
    "ERRO": "#f44336",
    "CONECTANDO": "#ff9800",
    "ABERTO": "#4caf50",
    "FECHANDO": "#ff9800",
    "FECHADO": "#9e9e9e",
};

export const Camera = ({ isStreamActive, onStart, onStop, ultimaNota, exibirNota, overlay }: CameraProps) => {
    const { videoRef, canvasRef, frameProcessado, erro, statusConexao, pararStream } = useVideoStream(isStreamActive);

    function startStream() { onStart(); }
    function stopStream() { pararStream(); onStop(); }


    const corPonto = useMemo(
        () => STATUS_COR[statusConexao] ?? "#9e9e9e",
        [statusConexao]
    );

    return (
        <Stack sx={styles.container}>
            <video ref={videoRef} style={{ display: "none" }} muted playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} />


            <Box sx={styles.cameraWrapper}>
                <Box
                    component="img"
                    src={frameProcessado || undefined}
                    alt="Transmissão de vídeo processado pelo backend"
                    sx={{
                        ...styles.video,
                        display: isStreamActive && !erro ? "block" : "none",
                    }}
                />

                {(!isStreamActive || erro) && (
                    <Stack sx={styles.placeholder}>
                        <Typography variant="h6" sx={styles.placeholderTitle}>
                            {erro ? "Stream indisponível" : "vídeo da câmera"}
                        </Typography>
                    </Stack>
                )}

                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: corPonto,
                        boxShadow: `0 0 6px ${corPonto}`,
                    }}
                />

                {overlay}
            </Box>

            <Stack sx={styles.buttons}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "Ubuntu, Arial, sans-serif",
                        display: exibirNota ? "block" : "none",
                    }}
                >
                    Última nota: {ultimaNota ?? ""}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button variante="Roxo" tamanho="md" onClick={startStream} disabled={isStreamActive}>
                        Iniciar transmissão
                    </Button>
                    <Button variante="Vermelho" tamanho="md" color="error" onClick={stopStream} disabled={!isStreamActive}>
                        Parar transmissão
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};