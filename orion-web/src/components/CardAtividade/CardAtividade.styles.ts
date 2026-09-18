import { StatusAtividade } from "@/api/models/SelecaoAtividade.types"
import type { SxProps, Theme } from "@mui/material"

export const cartao = (status: StatusAtividade): SxProps<Theme> => ({
    position: "relative",
    minHeight: 100,
    padding: "36px 28px 26px",
    borderRadius: "12px",
    border: "1px solid #8ea7ff",
    backgroundColor: status === StatusAtividade.Concluida ? "#f8faff" : "#ffffff",
    boxShadow:
        status === StatusAtividade.Concluida
            ? "0 10px 18px rgba(58, 74, 130, 0.24)"
            : "0 8px 15px rgba(58, 74, 130, 0.14)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    "&:hover": {
        transform: "translateY(-3px)",
        borderColor: "#aa4cff",
        boxShadow: "0 16px 30px rgba(58, 74, 130, 0.24)",
    },
})

export const chipNivel: SxProps<Theme> = {
    position: "absolute",
    top: 10,
    right: 12,
    height: 22,
    border: "1px solid #b26cff",
    backgroundColor: "#ffffff",
    color: "#6f3eff",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.68rem",
    fontWeight: 700,
}

export const titulo: SxProps<Theme> = {
    maxWidth: 260,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.18rem",
    lineHeight: 1.16,
    fontWeight: 800,
    marginBottom: "18px",
}

export const descricao: SxProps<Theme> = {
    maxWidth: 280,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.9rem",
    lineHeight: 1.2,
    color: "#707070",
}

export const marcaConcluida: SxProps<Theme> = {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 58,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#86a2f8",
    borderTopLeftRadius: 18,
}