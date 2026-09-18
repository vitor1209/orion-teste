import type { SxProps, Theme } from "@mui/material"


export const hero: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    textAlign: "center",
    padding: { xs: "96px 20px", md: 0 },
}

export const heroCopy: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    maxWidth: 760,
    mx: "auto",
}

export const heroTitle: SxProps<Theme> = {
    mb: 2.75,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(2.25rem, 4.6vw, 4rem)",
    lineHeight: 1.04,
    fontWeight: 800,
    letterSpacing: "-0.04em",
}

export const heroDescription: SxProps<Theme> = {
    maxWidth: 620,
    mb: 3.75,
    mx: "auto",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(0.98rem, 1.42vw, 1.08rem)",
    lineHeight: 1.58,
    color: "rgba(255, 255, 255, 0.78)",
}

export const heroDivider: SxProps<Theme> = {
    position: "absolute",
    zIndex: 1,
    left: "50%",
    bottom: 42,
    width: "min(420px, 54vw)",
    height: 2,
    borderRadius: 999,
    backgroundColor: "rgba(168, 116, 255, 0.78)",
    boxShadow: "0 0 26px rgba(168, 116, 255, 0.35)",
    transform: "translateX(-50%)",
    transformOrigin: "center",
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