import type { SxProps, Theme } from "@mui/material"

export const cartao: SxProps<Theme> = {
    zIndex: 1,
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    p: { xs: "24px", md: "40px" },
    m: { xs: "20px 0", md: "40px auto" },
    width: { xs: "auto", md: "60vw" },
    maxWidth: { xs: "100%", md: "75vw" },
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
}

export const eyebrow: SxProps<Theme> = {
    fontWeight: 600,
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#8f7cff",
    mb: 1,
    alignSelf: "flex-start",
}

export const titulo: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, sans-serif",
    fontSize: { xs: "1.4rem", sm: "1.75rem" },
    fontWeight: 700,
    color: "#111111",
    lineHeight: 1.2,
    mb: 1,
    alignSelf: "flex-start",
}

export const subtitulo: SxProps<Theme> = {
    fontSize: { xs: "0.84rem", sm: "0.9rem" },
    color: "#888888",
    lineHeight: 1.6,
    alignSelf: "flex-start",
    mb: 2,
}