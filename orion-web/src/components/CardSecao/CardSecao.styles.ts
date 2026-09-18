import type { SxProps, Theme } from "@mui/material"

export const cartao: SxProps<Theme> = {
    width: "100%",
    boxSizing: "border-box",
    padding: "24px 26px",
    border: "1px solid #8eaaff",
    borderRadius: "22px",
    backgroundColor: "#ffffff",
    marginBottom: "28px",
    transition: "transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease",

    "&:hover": {
        transform: "translateY(-2px)",
        borderColor: "#9d8cff",
        boxShadow: "0 14px 30px rgba(76, 94, 150, 0.12)",
    },
}

export const cabecalho: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingBottom: "10px",
    marginBottom: "18px",
    borderBottom: "1px solid #9b9b9b",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.45rem",
    lineHeight: 1.15,
    fontWeight: 800,
}

export const descricao: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    color: "#4b5568",
}

export const avatar: SxProps<Theme> = {
    width: 64,
    height: 64,
    backgroundColor: "#e4e7ee",
    color: "#9aa1b0",
}
