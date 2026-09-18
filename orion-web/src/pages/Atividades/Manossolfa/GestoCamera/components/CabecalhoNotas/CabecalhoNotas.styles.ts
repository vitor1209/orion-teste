import type { SxProps, Theme } from "@mui/material"

export const wrapper: SxProps<Theme> = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    padding: "2% 3% 1%",
}

export const linhaVoltar: SxProps<Theme> = {
    alignSelf: "flex-end",
}

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.1rem",
    fontWeight: 800,
    color: "#191d2b",
}

export const subtitulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.85rem",
    color: "#71717a",
}

export const pillsWrapper: SxProps<Theme> = {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 1,
}

export const pill = (ativa: boolean): SxProps<Theme> => ({
    minWidth: "3rem",
    height: "3rem",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.82rem",
    fontWeight: 700,
    color: ativa ? "#000" : "rgba(0,0,0,0.35)",
    background: ativa ? "#fff" : "#f4f4f5",
    border: ativa ? "2px solid #7C3AED" : "1px solid #e4e4e7",
    transition: "all 0.2s ease",
})
