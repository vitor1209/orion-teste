import type { SxProps, Theme } from "@mui/material"

export const painel: SxProps<Theme> = {
    position: "relative",
    flexShrink: 0,
    width: { xs: "100%", md: "25%" },
    minWidth: { md: 280 },
    minHeight: { md: "100vh" },
    boxSizing: "border-box",
    padding: { xs: "24px 18px", md: "64px 44px 42px" },
    backgroundColor: "#f4f7ff",
    borderRight: { xs: 0, md: "1px solid #dfe4f4" },
    borderBottom: { xs: "1px solid #dfe4f4", md: 0 },
    overflow: "hidden",
}

export const areaUsuario: SxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    marginBottom: { xs: "28px", md: "86px" },
}

export const avatarUsuario: SxProps<Theme> = {
    width: 76,
    height: 76,
    display: "grid",
    placeItems: "center",
    color: "#b8b8bb",
}

export const nomeUsuario: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.18rem",
    fontWeight: 800,
}

export const editarPerfil: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.92rem",
}

export const filtros: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    gap: "20px",
}

export const cabecalhoFiltros: SxProps<Theme> = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
}

export const botaoAlternarFiltros: SxProps<Theme> = {
    display: { xs: "inline-flex", md: "none" },
    alignItems: "center",
    gap: "6px",
    border: "1px solid #8eaaff",
    borderRadius: 999,
    padding: "8px 12px",
    backgroundColor: "#ffffff",
    color: "#5f74bf",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.9rem",
    fontWeight: 700,
    cursor: "pointer",
}

export const conteudoFiltros = (aberto: boolean): SxProps<Theme> => ({
    gap: "20px",
    display: { xs: aberto ? "flex" : "none", md: "flex" },
})

export const tituloFiltros: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "1.95rem",
    fontWeight: 800,
}

export const campoBusca: SxProps<Theme> = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
        height: 38,
        borderRadius: 999,
        backgroundColor: "#ffffff",
        fontFamily: '"Ubuntu", "Inter", sans-serif',
        fontSize: "0.9rem",
        "& fieldset": {
            borderColor: "#82a0ff",
        },
    },
    "& input::placeholder": {
        color: "#7e88a1",
        opacity: 1,
    },
}

export const grupoFiltro: SxProps<Theme> = {
    gap: "11px",
}

export const rotuloFiltro: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.96rem",
    fontWeight: 800,
}

export const botoesFiltro: SxProps<Theme> = {
    gap: "7px",
}
