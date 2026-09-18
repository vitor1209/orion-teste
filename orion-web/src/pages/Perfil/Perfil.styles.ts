import type { SxProps, Theme } from "@mui/material";

export const acaoTopo: SxProps<Theme> = {
    position: { xs: "static", md: "absolute" },
    top: { md: 78 },
    right: { md: 44 },
    display: { xs: "flex", md: "block" },
    justifyContent: { xs: "flex-end", md: "normal" },
    marginBottom: { xs: "20px", md: 0 },
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(2.2rem, 4vw, 3.15rem)",
    fontWeight: 800,
    marginBottom: "42px",
}

export const conteudo: SxProps<Theme> = {
    marginX: "auto",
    minHeight: "85vh",
    margin: { xs: "96px 16px 48px", md: "8% 15% 5% 15%" },
}

export const rotuloEmail: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.9rem",
    color: "#5d6472",
}

export const valorEmail: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1rem",
    fontWeight: 600,
    color: "#111827",
}