import type { SxProps, Theme } from "@mui/material"

export const pagina: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "24px",
}

export const conteudo: SxProps<Theme> = {
    alignItems: "center",
    gap: "18px",
}

export const progresso: SxProps<Theme> = {
    color: "#AA4CFF",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "#ffffff",
    fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
    fontWeight: 700,
}

export const descricao: SxProps<Theme> = {
    maxWidth: 420,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: "1rem",
    lineHeight: 1.55,
}
