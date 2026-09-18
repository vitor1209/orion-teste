import type { SxProps, Theme } from "@mui/material"

type NivelPasso = 1 | 2 | 3 | 4

const ALTURA_POR_NIVEL: Record<NivelPasso, number> = { 1: 240, 2: 220, 3: 200, 4: 180 }
const FONTE_TITULO_POR_NIVEL: Record<NivelPasso, string> = { 1: "1.6rem", 2: "1.5rem", 3: "1.4rem", 4: "1.3rem" }
const FONTE_DESCRICAO_POR_NIVEL: Record<NivelPasso, string> = { 1: "1.2rem", 2: "1.15rem", 3: "1.1rem", 4: "1rem" }

export const cartao = (nivel: NivelPasso): SxProps<Theme> => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    maxWidth: 320,
    minHeight: ALTURA_POR_NIVEL[nivel],
    background: "linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%)",
    border: "1px solid #e5e9f5",
    borderRadius: "24px",
    padding: "22px",
    paddingTop: "60px",
    boxShadow: "0 14px 28px rgba(15,23,42,.08), 0 2px 6px rgba(124,92,255,.08)",
    transition: "transform 0.25s",

    "&:hover": {
        transform: "translateY(-20px)",
    },

    "@media (max-width: 840px)": {
        minHeight: 180,
    },
})

export const numero: SxProps<Theme> = {
    position: "absolute",
    top: -24,
    left: "50%",
    transform: "translateX(-50%)",
    width: 58,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #c48cff, #7c5cff)",
    color: "#ffffff",
    fontWeight: 300,
    fontSize: "1.5rem",
    boxShadow: "0 10px 20px rgba(124, 92, 255, 0.35)",
}

export const titulo = (nivel: NivelPasso): SxProps<Theme> => ({
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontWeight: 700,
    color: "#172033",
    fontSize: FONTE_TITULO_POR_NIVEL[nivel],

    "@media (max-width: 840px)": {
        fontSize: "1.1rem",
    },
})

export const descricao = (nivel: NivelPasso): SxProps<Theme> => ({
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "#5b6782",
    lineHeight: 1.6,
    fontSize: FONTE_DESCRICAO_POR_NIVEL[nivel],

    "@media (max-width: 840px)": {
        fontSize: "0.9rem",
    },
})
