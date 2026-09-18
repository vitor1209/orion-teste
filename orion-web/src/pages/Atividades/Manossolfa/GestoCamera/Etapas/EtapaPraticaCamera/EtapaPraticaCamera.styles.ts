import type { SxProps, Theme } from "@mui/material"

export const linha: SxProps<Theme> = {
    position: "relative",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "center", md: "normal" },
    gap: { xs: 2, md: 0 },
    justifyContent: "center",
    width: "100%",
    marginBottom: 4
}

export const colunaReferencia: SxProps<Theme> = {
    position: { xs: "static", md: "absolute" },
    top: "-5%",
    left: "8%",
    zIndex: 10,
    order: { xs: -1, md: 0 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    flexShrink: 0,
    width: { xs: "45%", md: "23%" },
    borderRadius: 2,
    p: 1,
}

export const feedbackAcerto: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#2E7D32",
}

export const cardDica: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    width: "100%",
    borderRadius: 2,
    padding: "12px 16px",
    backgroundColor: "rgba(124, 58, 237, 0.06)",
    border: "1px solid rgba(124, 58, 237, 0.2)",
}

export const cardDicaTexto: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#515d7d",
}
