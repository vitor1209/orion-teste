import type { SxProps, Theme } from "@mui/material"

export const pagina: SxProps<Theme> = {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#080a14",
    overflowX: "hidden",
}

export const conteudoPrincipal: SxProps<Theme> = {
    boxSizing: "border-box",
    padding: "clamp(92px, 12vh, 112px) clamp(20px, 7vw, 92px) 72px",
}

export const grade: SxProps<Theme> = {
    width: "100%",
    maxWidth: 1240,
    marginX: "auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 340px",
    alignItems: "start",
    gap: "clamp(42px, 7vw, 86px)",

    "@media (max-width: 980px)": {
        gridTemplateColumns: "1fr",
    },
}

export const migalha: SxProps<Theme> = {
    marginBottom: "24px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    color: "#111827",
}

export const gradeCadastro: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "22px",

    "@media (max-width: 620px)": {
        gridTemplateColumns: "1fr",
    },
}

export const gradeEndereco: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: "1.1fr 1.25fr 0.42fr",
    gap: "18px 22px",

    "@media (max-width: 760px)": {
        gridTemplateColumns: "1fr 1fr",
    },

    "@media (max-width: 520px)": {
        gridTemplateColumns: "1fr",
    },
}

export const opcaoPagamento: SxProps<Theme> = {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    padding: "8px 14px",
    border: "1px solid #747474",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",

    "&:hover": {
        borderColor: "#8eaaff",
        boxShadow: "0 8px 18px rgba(76, 94, 150, 0.12)",
        transform: "translateY(-1px)",
    },
}

export const iconePagamento: SxProps<Theme> = {
    width: 28,
    height: 28,
    objectFit: "contain",
}

export const nomePagamento: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.88rem",
    fontWeight: 800,
}

export const descricaoPagamento: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.72rem",
    color: "#5d6472",
}

export const mensagemErroPagamento: SxProps<Theme> = {
    marginTop: "8px",
    marginLeft: "12px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.76rem",
    color: "#d32f2f",
}
