import type { SxProps, Theme } from "@mui/material"

export const item = (inverter: boolean): SxProps<Theme> => ({
    flexDirection: { xs: "column", sm: inverter ? "row-reverse" : "row" },
    alignItems: "center",
    gap: { xs: "24px", sm: "clamp(28px, 6vw, 64px)" },
    padding: "10px 0",
    textAlign: { xs: "center", sm: "left" },
})

export const blocoTexto: SxProps<Theme> = {
    flex: 1.15,
    gap: "16px",
    alignItems: { xs: "center", sm: "flex-start" },
    textAlign: { xs: "center", sm: "left" },
    "& .MuiButtonBase-root": {
        alignSelf: { xs: "center", sm: "flex-start" },
    },
}

export const titulo: SxProps<Theme> = {
    fontFamily: "Ubuntu",
    fontSize: "clamp(1.55rem, 4vw, 2rem)",
    fontWeight: 700,
    color: "#111",
}

export const descricao: SxProps<Theme> = {
    fontFamily: "Ubuntu",
    fontSize: "clamp(1rem, 2.8vw, 1.25rem)",
    color: "#555",
    lineHeight: 1.75,
}

export const blocoImagem: SxProps<Theme> = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

export const imagem: SxProps<Theme> = {
    width: "100%",
    maxWidth: "min(320px, 82vw)",
    objectFit: "contain",
    transition: "transform 0.25s ease, filter 0.25s ease",
    "&:hover": {
        transform: "scale(1.10)",
        filter: "brightness(1.02)",
    },
}