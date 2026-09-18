import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    position: "relative",
    padding: "120px clamp(18px, 4vw, 32px)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "min(800px, 100vh)",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "-60px",
        left: "-5%",
        width: "110%",
        height: "120px",
        background: "#E4E5EC",
        borderRadius: "0 0 50% 50%",
        zIndex: 1,
    },
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-60px",
        left: "-5%",
        width: "110%",
        height: "120px",
        background: "#F0F0F0",
        borderRadius: "50% 50% 0 0",
        zIndex: 1,
    },
}

export const wrapperVideo: SxProps<Theme> = {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

export const video: SxProps<Theme> = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.75,
}

export const conteudo: SxProps<Theme> = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: "560px",
}

export const titulo: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, sans-serif",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "16px",
    lineHeight: 1.2,
}

export const descricao: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "clamp(1rem, 3vw, 1.4rem)",
    color: "#c0c8e0",
    lineHeight: 1.65,
}

export const logo: SxProps<Theme> = {
    width: "225px",
    maxWidth: "100%",
    height: "auto",
    marginBottom: "32px",
    display: "block",
    marginX: "auto",
    objectFit: "contain",
}

export const linhaBotoes: SxProps<Theme> = {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
}