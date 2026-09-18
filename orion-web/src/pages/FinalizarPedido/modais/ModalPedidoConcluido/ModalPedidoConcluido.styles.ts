import type { SxProps, Theme } from "@mui/material"

export const papel: SxProps<Theme> = {
    width: "min(100%, 540px)",
    minHeight: 280,
    boxSizing: "border-box",
    padding: "56px clamp(28px, 6vw, 72px) 46px",
    borderRadius: "34px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
}

export const titulo: SxProps<Theme> = {
    marginBottom: "22px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(1.45rem, 4vw, 1.75rem)",
    fontWeight: 800,
}

export const texto: SxProps<Theme> = {
    maxWidth: 380,
    marginBottom: "14px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    lineHeight: 1.35,
    color: "#080a14",
}

export const botao: SxProps<Theme> = {
    width: "min(100%, 260px)",
    marginTop: "22px",
}
