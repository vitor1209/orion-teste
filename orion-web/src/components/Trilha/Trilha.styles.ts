import type { SxProps, Theme } from "@mui/material"

const TAMANHO_ICONE = 72

export const trilha: SxProps<Theme> = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: { xs: "stretch", md: "flex-start" },
    width: "100%",
    paddingTop: "8px",
}

export const coluna: SxProps<Theme> = {
    display: "flex",
    flexDirection: { xs: "row", md: "column" },
    alignItems: "center",
    gap: { xs: "16px", md: 0 },
    flex: "0 0 auto",
    width: { xs: "100%", md: 140 },
    textAlign: { xs: "left", md: "center" },
}

export const icone = (concluida: boolean): SxProps<Theme> => ({
    width: TAMANHO_ICONE,
    height: TAMANHO_ICONE,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    flexShrink: 0,
    backgroundColor: concluida ? "#e4e9ff" : "#eef0f4",
    color: concluida ? "#4f6fdc" : "#9aa1b0",
    marginBottom: { xs: 0, md: "14px" },
})

export const conector = (concluido: boolean): SxProps<Theme> => ({
    flexGrow: { xs: 0, md: 1 },
    width: { xs: "2px", md: "auto" },
    height: { xs: "24px", md: "2px" },
    marginTop: { xs: "4px", md: `${TAMANHO_ICONE / 2 - 1}px` },
    marginBottom: { xs: "4px", md: 0 },
    marginLeft: { xs: `${TAMANHO_ICONE / 2 - 1}px`, md: 0 },
    backgroundColor: concluido ? "#8eaaff" : "#dfe2e9",
})

export const titulo: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1rem",
    fontWeight: 800,
    marginBottom: "4px",
}

export const legenda: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.82rem",
    color: "#5d6472",
    lineHeight: 1.4,
}

export const data: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.82rem",
    color: "#5d6472",
    lineHeight: 1.4,
}
