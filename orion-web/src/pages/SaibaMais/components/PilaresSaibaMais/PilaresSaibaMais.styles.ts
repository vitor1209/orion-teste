import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    padding: "96px clamp(20px, 7vw, 96px)",
    backgroundColor: "#f6f7fb",
}

export const cabecalho: SxProps<Theme> = {
    maxWidth: 780,
    margin: "0 auto 46px",
    textAlign: "center",
}

export const eyebrow: SxProps<Theme> = {
    mb: 1.25,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.84rem",
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#8b4cff",
}

export const titulo: SxProps<Theme> = {
    mb: 2,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(1.85rem, 3.8vw, 3rem)",
    lineHeight: 1.08,
    fontWeight: 800,
    letterSpacing: "-0.032em",
}

export const descricao: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(0.96rem, 1.45vw, 1.05rem)",
    lineHeight: 1.62,
    color: "#4f5870",
}

export const grade: SxProps<Theme> = {
    maxWidth: 1160,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 3,
    "@media (max-width: 920px)": {
        gridTemplateColumns: "1fr",
    },
}
