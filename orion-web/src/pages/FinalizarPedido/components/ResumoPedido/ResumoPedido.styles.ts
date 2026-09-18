import type { SxProps, Theme } from "@mui/material"

export const cartao: SxProps<Theme> = {
    position: "sticky",
    top: "96px",
    alignSelf: "start",
    padding: "24px 22px",
    border: "2px solid #9db3ff",
    borderRadius: "22px",
    backgroundColor: "#ffffff",
    boxShadow: "0 12px 26px rgba(76, 94, 150, 0.22)",
    overflow: "hidden",
    transition: "transform 0.24s ease, box-shadow 0.24s ease",

    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 18px 38px rgba(76, 94, 150, 0.25)",
    },

    "@media (max-width: 980px)": {
        position: "relative",
        top: 0,
        maxWidth: 420,
    },
}

export const titulo: SxProps<Theme> = {
    paddingBottom: "12px",
    borderBottom: "1px solid #b8b8b8",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.55rem",
    fontWeight: 800,
}

export const linhaProduto: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: "86px 1fr auto",
    alignItems: "center",
    gap: "14px",
    padding: "26px 0",
}

export const caixaImagem: SxProps<Theme> = {
    width: 86,
    height: 72,
    display: "grid",
    placeItems: "center",
    borderRadius: "12px",
    backgroundColor: "#e9e9e9",
    overflow: "hidden",
}

export const imagem: SxProps<Theme> = {
    width: "82%",
    height: "82%",
    objectFit: "contain",
}

export const nomeProduto: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    fontWeight: 800,
}

export const removerProduto: SxProps<Theme> = {
    marginTop: "4px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.76rem",
    color: "#4d5566",
}

export const precoProduto: SxProps<Theme> = {
    display: "grid",
    justifyItems: "end",
    gap: "8px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.9rem",
    fontWeight: 800,
}

export const divisor: SxProps<Theme> = {
    height: "1px",
    backgroundColor: "#c9c9c9",
}

export const listaValores: SxProps<Theme> = {
    gap: "16px",
    padding: "28px 0",
}

export const linhaValor: SxProps<Theme> = {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "16px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.92rem",
    color: "#353b48",

    "& strong": {
        color: "#080a14",
    },
}

export const linhaTotal: SxProps<Theme> = {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "16px",
    padding: "22px 0 28px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1rem",
    color: "#353b48",

    "& strong": {
        color: "#080a14",
    },
}
