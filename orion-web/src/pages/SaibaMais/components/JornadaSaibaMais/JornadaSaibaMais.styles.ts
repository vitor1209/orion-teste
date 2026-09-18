import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    padding: "96px clamp(20px, 7vw, 96px)",
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(320px, 1fr)",
    gap: "clamp(36px, 7vw, 86px)",
    alignItems: "center",
    backgroundColor: "#ffffff",
    "@media (max-width: 860px)": {
        gridTemplateColumns: "1fr",
    },
}

export const conteudo: SxProps<Theme> = {
    maxWidth: 540,
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

export const listaEtapas: SxProps<Theme> = {
    position: "relative",
    display: "grid",
    gap: 2.25,
    pl: 2.25,
    "&::before": {
        content: '""',
        position: "absolute",
        left: 45,
        top: 28,
        bottom: 28,
        width: 2,
        borderRadius: 999,
        backgroundColor: "#dfe5ff",
    },
    "@media (max-width: 520px)": {
        pl: 0,
        "&::before": { display: "none" },
    },
}

export const etapa: SxProps<Theme> = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "54px 1fr",
    alignItems: "center",
    gap: 2.75,
    p: "22px 24px",
    border: "1px solid #dfe5ff",
    borderRadius: "24px",
    backgroundColor: "#f6f8ff",
    boxShadow: "0 14px 26px rgba(33, 48, 84, 0.07)",
    "@media (max-width: 520px)": {
        gridTemplateColumns: "1fr",
    },
}

export const numeroEtapa: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    width: 54,
    height: 54,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    backgroundColor: "#a874ff",
    color: "#ffffff",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontWeight: 800,
    boxShadow: "0 0 0 8px #f6f8ff",
}

export const textoEtapa: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.02rem",
    color: "#273044",
}