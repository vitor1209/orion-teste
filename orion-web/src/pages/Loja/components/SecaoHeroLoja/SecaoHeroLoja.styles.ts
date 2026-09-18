import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    padding: { xs: "104px 18px 56px", md: "clamp(86px, 11vh, 116px) clamp(20px, 7vw, 96px) 72px" },
}

export const conteudo: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 1240,
    minHeight: { md: "calc(100vh - 188px)" },
    marginX: "auto",
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "minmax(320px, 1fr) minmax(320px, 520px)" },
    alignItems: "center",
    gap: "clamp(44px, 8vw, 100px)",
    textAlign: { xs: "center", md: "left" },
}

export const infoProduto: SxProps<Theme> = {
    maxWidth: { xs: 680, md: 520 },
    marginX: { xs: "auto", md: 0 },
}

export const titulo: SxProps<Theme> = {
    marginBottom: "26px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(2.45rem, 5vw, 3.35rem)",
    fontWeight: 800,
    color: "#ffffff",
}

export const descricao: SxProps<Theme> = {
    marginBottom: "28px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(0.98rem, 1.7vw, 1.05rem)",
    lineHeight: 1.48,
    color: "#ffffff",
}

export const rotuloMateriais: SxProps<Theme> = {
    marginBottom: "18px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1rem",
    fontWeight: 800,
}

export const listaMateriais: SxProps<Theme> = {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    gap: "clamp(42px, 7vw, 96px)",
    marginBottom: "50px",
}

export const circuloMaterial: SxProps<Theme> = {
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: "#dedede",
}

export const preco: SxProps<Theme> = {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    alignItems: "baseline",
    gap: "16px",
    marginBottom: "34px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    "& strong": {
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 800,
    },
    "& span": {
        fontSize: "clamp(1.55rem, 3vw, 2.1rem)",
        fontWeight: 500,
    },
}

export const acoes: SxProps<Theme> = {
    display: "flex",
    alignItems: { xs: "stretch", sm: "center" },
    justifyContent: { xs: "center", md: "flex-start" },
    flexDirection: { xs: "column", sm: "row" },
    gap: "28px",
    flexWrap: "wrap",
}

export const textoConfianca: SxProps<Theme> = {
    marginTop: "22px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.92rem",
    color: "rgba(255, 255, 255, 0.78)",
}