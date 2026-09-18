import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    position: "relative",
    overflow: "hidden",
    background:
        "linear-gradient(180deg, rgba(246, 247, 251, 0.92) 0%, rgba(237, 240, 247, 0.96) 100%), linear-gradient(180deg, rgba(124, 92, 255, 0.10) 0%, rgba(124, 92, 255, 0.00) 45%)",
    color: "#172033",
    minHeight: "100vh",
    padding: {
        xs: "180px 20px 80px",
        sm: "clamp(180px, 22vh, 350px) 20px clamp(96px, 18vh, 250px)",
    },
}

export const camadaFundo = (imagem: string): SxProps<Theme> => ({
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${imagem})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: 0.1,
    pointerEvents: "none",
})

export const camadaOnda: SxProps<Theme> = {
    position: "absolute",
    left: 0,
    right: 0,
    top: -10,
    width: "100%",
    height: "auto",
    pointerEvents: "none",
    zIndex: 0,
}

export const container: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px !important",
}

export const cabecalho: SxProps<Theme> = {
    textAlign: "center",
    marginBottom: "48px",
    position: "relative",
    zIndex: 1,
}

export const eyebrow: SxProps<Theme> = {
    textTransform: "uppercase",
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    letterSpacing: "0.25em",
    fontWeight: 600,
    fontSize: "1.2rem",
    color: "#7c5cff",
    marginBottom: "12px",
}

export const titulo: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontSize: "clamp(2.1rem, 5vw, 3rem)",
    lineHeight: 1.05,
    fontWeight: 700,
    marginBottom: "12px",
    letterSpacing: "-0.04em",
}

export const subtitulo: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontWeight: 400,
    maxWidth: 720,
    marginX: "auto",
    color: "#5b6782",
    fontSize: "clamp(1.05rem, 2.6vw, 1.5rem)",
    lineHeight: 1.65,
}

export const gradePassos: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, minmax(0, 1fr))" },
    alignItems: "flex-end",
    justifyItems: { xs: "stretch", sm: "center" },
    gap: { xs: "24px", sm: "32px", md: "40px" },
}