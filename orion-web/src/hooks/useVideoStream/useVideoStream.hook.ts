/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from "react";
import { Enum } from "../../utils/Enums";
import { montarUrlWebSocket } from "@/utils/sessaoWebSocket";

const CONFIG = {
    WIDTH: 512,
    HEIGHT: 384,
    JPEG_QUALITY: 0.7,
    MAX_FPS: 20,
};

export const useVideoStream = (ativo: boolean) => {
    const wsRef = useRef<WebSocket | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number>(0);
    const frameAnteriorRef = useRef<string | null>(null);
    const geracaoRef = useRef(0);

    const [statusConexao, setStatusConexao] = useState<Enum.TipoConexao>(Enum.TipoConexao.FECHADO);
    const [frameProcessado, setFrameProcessado] = useState<string | null>(null);
    const [erro, setErro] = useState<boolean>(false);

    const pararStream = () => {
        geracaoRef.current += 1;

        if (animationFrameIdRef.current !== null) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }

        const ws = wsRef.current;
        if (ws) {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onerror = null;
            ws.onclose = null;
            ws.close();
        }
        wsRef.current = null;

        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;

        const video = videoRef.current;
        if (video) {
            video.pause();
            video.srcObject = null;
        }

        if (frameAnteriorRef.current) {
            URL.revokeObjectURL(frameAnteriorRef.current);
            frameAnteriorRef.current = null;
        }

        setStatusConexao(Enum.TipoConexao.FECHADO);
        setFrameProcessado(null);
    };

    useEffect(() => {
        if (!ativo) {
            pararStream();
            return;
        }

        geracaoRef.current += 1;
        const geracao = geracaoRef.current;
        const sessaoAtiva = () => geracao === geracaoRef.current;
        const intervalo = 1000 / CONFIG.MAX_FPS;

        const loopEnvio = (timestamp: DOMHighResTimeStamp) => {
            if (!sessaoAtiva()) return;

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ws = wsRef.current;

            if (!video || !canvas || !ws || ws.readyState !== WebSocket.OPEN) {
                animationFrameIdRef.current = requestAnimationFrame(loopEnvio);
                return;
            }

            if (timestamp - lastFrameTimeRef.current >= intervalo) {
                lastFrameTimeRef.current = timestamp;

                const ctx = canvas.getContext("2d")!;
                canvas.width = CONFIG.WIDTH;
                canvas.height = CONFIG.HEIGHT;
                ctx.drawImage(video, 0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

                canvas.toBlob((blob) => {
                    if (blob && sessaoAtiva() && ws?.readyState === WebSocket.OPEN) {
                        blob.arrayBuffer().then((buffer) => ws.send(buffer));
                    }
                }, "image/jpeg", CONFIG.JPEG_QUALITY);
            }

            animationFrameIdRef.current = requestAnimationFrame(loopEnvio);
        };

        const iniciarStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: CONFIG.WIDTH },
                        height: { ideal: CONFIG.HEIGHT },
                        frameRate: { ideal: CONFIG.MAX_FPS, max: CONFIG.MAX_FPS },
                    }
                });

                if (!sessaoAtiva()) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play().catch(() => undefined);
                }
                setErro(false);
            } catch {
                if (sessaoAtiva()) setErro(true);
            }
        };

        iniciarStream().then(() => {
            if (!sessaoAtiva()) return;

            const ws = new WebSocket(montarUrlWebSocket("/api/v1/video"));
            ws.binaryType = "arraybuffer";
            wsRef.current = ws;

            ws.onopen = () => {
                if (!sessaoAtiva()) {
                    ws.close();
                    return;
                }
                setStatusConexao(Enum.TipoConexao.ABERTO);
                animationFrameIdRef.current = requestAnimationFrame(loopEnvio);
            };

            ws.onmessage = (event) => {
                if (!sessaoAtiva()) return;

                if (frameAnteriorRef.current) {
                    URL.revokeObjectURL(frameAnteriorRef.current);
                }

                const blob = new Blob([event.data], { type: "image/jpeg" });
                const url = URL.createObjectURL(blob);
                frameAnteriorRef.current = url;
                setFrameProcessado(url);
            };

            ws.onerror = () => {
                if (sessaoAtiva()) setStatusConexao(Enum.TipoConexao.ERRO);
            };

            ws.onclose = () => {
                if (sessaoAtiva()) setStatusConexao(Enum.TipoConexao.FECHADO);
            };
        });

        return () => {
            pararStream();
        };
    }, [ativo]);

    return {
        videoRef,
        canvasRef,
        frameProcessado,
        statusConexao: Enum.TipoConexao[statusConexao],
        erro,
        pararStream,
    };
};
