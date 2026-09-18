import type { SxProps, Theme } from "@mui/material"

export const fundo: SxProps<Theme> = {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: { xs: "32px 20px 48px", sm: "2% 1%" },
}

export const wrapper: SxProps<Theme> = {
    width: { xs: "100%", md: "80%" },
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
    padding: { xs: "20px 16px", md: "28px 32px" },
    border: "1px solid rgba(0,0,0,0.08)"
}

export const etapaContainer : SxProps<Theme> = ({
    padding: { xs: "16px 0 20px", md: "16px 20px 20px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2.5,
    width: { xs: "100%", md: "80%" }
})

export const etapaTitulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#191d2b",
}

export const etapaDescricao: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#515d7d",
    maxWidth: 420,
}
