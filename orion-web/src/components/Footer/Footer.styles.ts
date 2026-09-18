import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    backgroundColor: "#f5f5f5",
    borderTop: "1px solid #e0e0e0",
    padding: { xs: "42px 22px", sm: "56px 40px" },
}

export const inner: SxProps<Theme> = {
    maxWidth: 960,
    marginX: "auto",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "center", md: "flex-start" },
    textAlign: { xs: "center", md: "left" },
    gap: { xs: "34px", md: "clamp(48px, 12vw, 180px)" },
}

export const brandBlock: SxProps<Theme> = {
    flex: 1.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    textAlign: "center",
}

export const logo: SxProps<Theme> = {
    height: 64,
    objectFit: "contain",
    alignSelf: "center",
    marginBottom: "2px",
}

export const tagline: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.18em",
    color: "#111",
    textTransform: "uppercase",
}

export const description: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontSize: "0.75rem",
    color: "#555",
    lineHeight: 1.7,
    maxWidth: 340,
}

export const linksBlock: SxProps<Theme> = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: { xs: "center", md: "flex-start" },
}

export const columnTitle: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#111",
}

export const linkList: SxProps<Theme> = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
}

export const linkItem: SxProps<Theme> = {
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontSize: "0.95rem",
    color: "#555",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s ease",
    "&:hover": {
        color: "#111",
    },
}

export const collabList: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
}

export const collabItem: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Ubuntu, Arial, Helvetica, sans-serif",
    fontSize: "0.95rem",
    color: "#555",
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": {
        color: "#111",
    },
}