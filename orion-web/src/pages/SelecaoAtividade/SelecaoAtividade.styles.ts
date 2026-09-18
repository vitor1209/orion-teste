import type { SxProps, Theme } from "@mui/material"

export const pagina: SxProps<Theme> = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    color: "#080a14",
}

export const layout: SxProps<Theme> = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
}

export const main: SxProps<Theme> = {
    position: "relative",
    flex: 1,
    minWidth: 0,
    boxSizing: "border-box",
    padding: { xs: "28px 18px 46px", md: "52px clamp(28px, 5vw, 82px) 64px" },
}

export const acaoTopo: SxProps<Theme> = {
    position: { xs: "static", md: "absolute" },
    top: { md: 48 },
    right: { md: 44 },
    display: { xs: "flex", md: "block" },
    justifyContent: { xs: "flex-end", md: "normal" },
    marginBottom: { xs: "20px", md: 0 },
}

export const conteudo: SxProps<Theme> = {
    width: "100%",
    maxWidth: 1240,
    marginX: "auto",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(2.2rem, 4vw, 3.15rem)",
    fontWeight: 800,
    marginBottom: "42px",
}