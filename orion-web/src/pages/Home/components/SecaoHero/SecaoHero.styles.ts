import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "clamp(32px, 5vw, 80px)",
    padding: "clamp(96px, 12vh, 140px) clamp(20px, 8vw, 8%) 56px",
    flexDirection: { xs: "column", lg: "row" },
    textAlign: { xs: "center", lg: "left" },
}

export const conteudo: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    width: "min(100%, 900px)",
}

export const titulo: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, sans-serif",
    fontSize: "clamp(2.45rem, 7vw, 4rem)",
    fontWeight: 600,
    lineHeight: 1.1,
    color: "#fff",
    maxWidth: "900px",
    marginBottom: "24px",
    marginInline: { xs: "auto", lg: 0 },
}

export const descricao: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, sans-serif",
    fontWeight: 400,
    color: "#D8D8D8",
    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
    lineHeight: 1.7,
    marginBottom: "40px",
    maxWidth: "650px",
    marginInline: { xs: "auto", lg: 0 },
}

export const containerBotoes: SxProps<Theme> = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "40px",
    justifyContent: { xs: "center", lg: "flex-start" },
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "stretch", sm: "center" },
}

export const containerImagem: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    width: { xs: "min(92vw, 420px)", md: "min(76vw, 520px)", lg: "min(44vw, 760px)" },
    flexShrink: 1,
    "&::before": {
        content: '""',
        position: "absolute",
        width: "90%",
        height: "90%",
        background: "radial-gradient(circle, rgba(118,95,255,.35) 0%, rgba(118,95,255,0) 70%)",
        top: "50%",
        left: "74%",
        transform: "translate(-80%, -50%)",
        zIndex: 0,
    },
}

export const imagem: SxProps<Theme> = {
    width: "100%",
    maxWidth: "100%",
    position: "relative",
    zIndex: 10,
}