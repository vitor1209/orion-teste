import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2.5,
    padding: "24px",
    textAlign: "center",
    background:
        "radial-gradient(circle at top, rgba(124, 92, 255, 0.14), transparent 22%), linear-gradient(180deg, #fbfbff 0%, #f4f6ff 100%)",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#191d2b",
}

export const descricao: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.95rem",
    color: "#515d7d",
    maxWidth: 420,
}
