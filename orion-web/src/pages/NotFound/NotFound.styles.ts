import type { SxProps, Theme } from "@mui/material"

export const pagina: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "18px",
    padding: "24px",
}

export const codigo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(4rem, 12vw, 7rem)",
    fontWeight: 800,
    lineHeight: 1,
    background: "linear-gradient(135deg, #AA4CFF, #5e3bb8)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "#ffffff",
    fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
    fontWeight: 700,
}

export const subtitulo: SxProps<Theme> = {
    maxWidth: 420,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: "1rem",
    lineHeight: 1.55,
}
