import type { SxProps, Theme } from "@mui/material"

export const secao: SxProps<Theme> = {
    position: "relative",
    margin: "0 clamp(20px, 7vw, 96px) 92px",
    padding: "48px clamp(24px, 6vw, 64px)",
    border: "1px solid rgba(168, 116, 255, 0.26)",
    borderRadius: "34px",
    backgroundColor: "#0d1428",
    color: "#ffffff",
    textAlign: "center",
    boxShadow: "0 22px 48px rgba(13, 20, 40, 0.18)",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 50% 0%, rgba(168, 116, 255, 0.18), transparent 38%)",
        pointerEvents: "none",
    },
    "& > *": {
        position: "relative",
        zIndex: 1,
    },
}

export const eyebrow: SxProps<Theme> = {
    mb: 1.25,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.84rem",
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#8b4cff",
}

export const titulo: SxProps<Theme> = {
    maxWidth: 620,
    margin: "0 auto 12px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(1.45rem, 2.8vw, 2.2rem)",
    lineHeight: 1.15,
    fontWeight: 800,
}

export const descricao: SxProps<Theme> = {
    maxWidth: 520,
    margin: "0 auto 26px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.98rem",
    lineHeight: 1.55,
    color: "rgba(255, 255, 255, 0.74)",
}

export const acoes: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    flexWrap: "wrap",
    "@media (max-width: 520px)": {
        flexDirection: "column",
        alignItems: "stretch",
    },
}