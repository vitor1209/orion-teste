import type { SxProps, Theme } from "@mui/material"

export const area: SxProps<Theme> = {
    display: "grid",
    gridTemplateColumns: { xs: "14px 1fr", md: "14px minmax(260px, 380px) minmax(220px, 1fr)" },
    alignItems: "center",
    gap: "10px",
    marginBottom: "54px",
}

export const marcador: SxProps<Theme> = {
    width: "1px",
    height: "42px",
    backgroundColor: "#d8d8d8",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.35rem",
    fontWeight: 700,
}

export const subtitulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.9rem",
    color: "#7b7f8c",
}

export const wrapperBarra: SxProps<Theme> = {
    position: "relative",
    paddingRight: "24px",
    gridColumn: { xs: "1 / -1", md: "auto" },
    marginTop: { xs: "14px", md: 0 },
}

export const barra: SxProps<Theme> = {
    height: 4,
    backgroundColor: "#7f7f7f",
    "& .MuiLinearProgress-bar": {
        backgroundColor: "#b26cff",
    },
}

export const diamante = (progresso: number): SxProps<Theme> => ({
    position: "absolute",
    left: `${progresso}%`,
    top: "50%",
    width: 13,
    height: 13,
    backgroundColor: "#7f7f7f",
    transform: "translate(-50%, -50%) rotate(45deg)",
})

export const valor = (progresso: number): SxProps<Theme> => ({
    position: "absolute",
    left: `${progresso}%`,
    top: 8,
    transform: "translateX(-50%)",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.72rem",
    color: "#525252",
})