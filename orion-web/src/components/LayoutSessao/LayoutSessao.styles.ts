import type { SxProps, Theme } from "@mui/material"
import notasImg from "@/assets/images/notas1.png"

export const wrapper: SxProps<Theme> = {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: -300,
        right: 0,
        width: "min(640px, 90vw)",
        height: "min(640px, 90vw)",
        backgroundImage: `url(${notasImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top right",
        opacity: 0.18,
        pointerEvents: "none",
        zIndex: 0,
        transform: "rotate(180deg)",
    },
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: "23%",
        left: 0,
        width: "min(640px, 90vw)",
        height: "min(640px, 90vw)",
        backgroundImage: `url(${notasImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "bottom left",
        opacity: 0.18,
        pointerEvents: "none",
        zIndex: 0,
    },
}

export const botaoVoltarWrapper: SxProps<Theme> = {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 2,
    "@media (max-width: 600px)": {
        position: "static",
        alignSelf: "flex-end",
        mb: 1.5,
    },
}

export const cartaoModal: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    minHeight: { xs: "calc(100vh - 40px)", md: "calc(100vh - 80px)" },
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRadius: { xs: "16px", sm: "20px" },
    p: { xs: "20px 16px", md: "40px" },
    m: { xs: "20px 16px", md: "40px auto" },
    width: "100%",
    maxWidth: { xs: "calc(100vw - 32px)", md: "75vw" },
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    alignItems: "center",
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
}