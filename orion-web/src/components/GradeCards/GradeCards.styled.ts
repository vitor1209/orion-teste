import type { SxProps, Theme } from "@mui/material"

export const grade: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, minmax(140px, 1fr))",
        md: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
    },
    gap: 1.75,
}