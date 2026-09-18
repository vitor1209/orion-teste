import type { SxProps, Theme } from "@mui/material"

export const overlayConfirmacao = (duracaoSegundos: number): SxProps<Theme> => ({
    position: "absolute",
    inset: 0,
    borderRadius: "12px",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: `overlayConfirmacaoGestoProgressoVerde ${duracaoSegundos}s linear forwards`,
    "@keyframes overlayConfirmacaoGestoProgressoVerde": {
        "0%": {
            backgroundColor: "rgba(76, 175, 80, 0.08)",
            boxShadow: "inset 0 0 0 0px rgba(76, 175, 80, 0.2)",
        },
        "100%": {
            backgroundColor: "rgba(76, 175, 80, 0.32)",
            boxShadow: "inset 0 0 0 14px rgba(76, 175, 80, 0.6)",
        },
    },
})

export const contadorConfirmacao: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "4rem",
    fontWeight: 900,
    color: "#2E7D32",
    textShadow: "0 2px 10px rgba(0,0,0,0.35)",
    lineHeight: 1,
}
