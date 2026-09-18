import type { SxProps, Theme } from "@mui/material"

export const header: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    py: { xs: 2, sm: 2.5 },
    margin: { xs: "2% 0 0", md: "2% 15% 0" },
}

export const logo: SxProps<Theme> = {
    height: { xs: 44, sm: 52 },
    objectFit: "contain",
}

export const tagline: SxProps<Theme> = {
    fontSize: { xs: "0.68rem", sm: "0.85rem" },
    letterSpacing: { xs: "0.16em", sm: "0.22em" },
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#5f4af8",
    margin: 0,
}

export const linha: SxProps<Theme> = {
    width: "100%",
    height: 5,
    backgroundColor: "#8b5cf6",
    borderRadius: 10,
    mt: 1.5,
}