import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    minHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "#f0f0f0",
    padding: "clamp(56px, 8vw, 84px) clamp(18px, 4vw, 24px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}

export const cabecalho: SxProps<Theme> = {
    textAlign: "center",
    maxWidth: 560,
    marginBottom: "64px",
    alignItems: "center",
}

export const titulo: SxProps<Theme> = {
    fontFamily: "Ubuntu",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 700,
    color: "#111",
    marginBottom: "16px",
}

export const subtitulo: SxProps<Theme> = {
    fontFamily: "Ubuntu",
    fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
    color: "#444",
    lineHeight: 1.7,
    marginBottom: "24px",
}

export const logo: SxProps<Theme> = {
    height: 75,
    objectFit: "contain",
}

export const listaFuncionalidades: SxProps<Theme> = {
    width: "100%",
    maxWidth: 1080,
    gap: "clamp(42px, 7vw, 64px)",
}