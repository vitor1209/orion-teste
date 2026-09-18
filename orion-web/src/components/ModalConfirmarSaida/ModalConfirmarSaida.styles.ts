import type { SxProps, Theme } from "@mui/material"

export const papel: SxProps<Theme> = {
    width: "min(100%, 560px)",
    boxSizing: "border-box",
    padding: "44px clamp(24px, 6vw, 48px) 38px",
    borderRadius: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
}

export const titulo: SxProps<Theme> = {
    marginBottom: "14px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "clamp(1.3rem, 4vw, 1.55rem)",
    fontWeight: 800,
}

export const texto: SxProps<Theme> = {
    maxWidth: 360,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    lineHeight: 1.5,
    color: "#4f5668",
}

export const linhaBotoes: SxProps<Theme> = {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "14px",
    marginTop: "28px",
    width: "100%",

    "& > button": {
        flex: "1 1 160px",
    },
}
