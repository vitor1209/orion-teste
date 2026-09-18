import type { SxProps, Theme } from "@mui/material"

export const grade: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", lg: "repeat(3, minmax(240px, 1fr))", xxl: "repeat(4, minmax(230px, 1fr))" },
    gap: { xs: "18px", sm: "30px 26px" },
    paddingBottom: "4px",
}

export const estadoVazio: SxProps<Theme> = {
    marginTop: "24px",
    padding: "28px 24px",
    borderRadius: "14px",
    border: "1px dashed #8eaaff",
    backgroundColor: "#f8faff",
    color: "#667089",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1rem",
    fontWeight: 700,
    textAlign: "center",
}