import type { SxProps, Theme } from "@mui/material"

export const trilha: SxProps<Theme> = {
    position: "absolute",
    top: 24,
    bottom: 24,
    right: 12,
    width: 4,
    borderRadius: "999px",
    backgroundColor: "#e3d6ff",
}

export const preenchimento = (topoPercentual: number, alturaPercentual: number): SxProps<Theme> => ({
    position: "absolute",
    top: `${topoPercentual}%`,
    height: `${alturaPercentual}%`,
    width: "100%",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #aa4cff, #7C3AED)",
})
