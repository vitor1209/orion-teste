import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    padding: "80px clamp(20px, 7vw, 96px)",
    backgroundColor: "#ffffff",
    color: "#080a14",
}

export const cabecalho: SxProps<Theme> = {
    maxWidth: 820,
    marginX: "auto",
    marginBottom: "38px",
    textAlign: "center",
}

export const eyebrow: SxProps<Theme> = {
    marginBottom: "10px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.92rem",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#8b4cff",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
}

export const grade: SxProps<Theme> = {
    width: "100%",
    maxWidth: 1120,
    marginX: "auto",
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
    gap: "24px",
}