import type { SxProps, Theme } from "@mui/material"

export const distintivoSucesso: SxProps<Theme> = {
    width: 72,
    height: 72,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    background: "linear-gradient(135deg, #aa4cff, #7C3AED)",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.6rem",
    fontWeight: 800,
    color: "#191d2b",
}

export const notaAprendida: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1rem",
    color: "#515d7d",
}

export const textoAutoAvanco: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.82rem",
    color: "#9ca3af",
}
