import type { SxProps, Theme } from "@mui/material"

export const container = (escuro: boolean): SxProps<Theme> => ({
    backgroundColor: escuro ? "#0C1528" : "#FFFFFF",
    boxShadow: escuro ? "none" : "0 1px 0 rgba(15, 23, 42, 0.08)",
    position: "fixed",
    top: 0,
    borderBottom: escuro ? "none" : "1px solid #e0e0e0",
    color: escuro ? "#ffffff" : "#050505",
    transition:
        "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease",
    "& a": {
        color: escuro ? "#ffffff" : "#111111",
    },
    "& svg": {
        color: escuro ? "#ffffff" : "#111111",
    },
    "& img": {
        filter: escuro ? "brightness(0) invert(1)" : "none",
    },
})

export const conteudo: SxProps<Theme> = {
    maxWidth: "1120px",
    width: "100%",
    height: { xs: "58px", md: "47px" },
    marginX: "auto",
    display: "grid",
    gridTemplateColumns: { xs: "1fr auto", md: "180px 1fr 240px" },
    alignItems: "center",
    padding: { xs: "0 18px", md: "0 12px" },
}

export const logo: SxProps<Theme> = {
    height: "39px",
    objectFit: "contain",
    display: "block",
    transition: "filter 0.25s ease",
}

export const linksNavegacao: SxProps<Theme> = {
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    gap: "32px",
    "& a": {
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
        transition: "color 0.2s ease, opacity 0.2s ease",
    },
    "& a:hover": {
        opacity: 0.72,
    },
}

export const acoesAutenticacao: SxProps<Theme> = {
    display: { xs: "none", md: "flex" },
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "42px",
    "& a": {
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: 500,
        whiteSpace: "nowrap",
        transition: "color 0.2s ease, opacity 0.2s ease",
    },
    "& a:hover": {
        opacity: 0.72,
    },
}

export const linkEntrar: SxProps<Theme> = {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
}

export const linkPerfil: SxProps<Theme> = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    padding: "6px",
    transition: "opacity 0.2s ease",

    "&:hover": {
        opacity: 0.72,
    },
}

export const botaoMenuMobile: SxProps<Theme> = {
    display: { xs: "inline-flex", md: "none" },
    justifySelf: "flex-end",
    borderRadius: "12px",
    padding: "8px",
}

export const menuMobilePaper: SxProps<Theme> = {
    width: "min(82vw, 320px)",
    padding: "22px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
}

export const cabecalhoMenuMobile: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
}

export const botaoFecharMenu: SxProps<Theme> = {
    color: "#111",
    borderRadius: "12px",
    padding: "8px",
}

export const linksMenuMobile: SxProps<Theme> = {
    gap: "10px",
    "& a": {
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        borderRadius: "12px",
        textDecoration: "none",
        color: "#111",
        fontSize: "1rem",
        fontWeight: 600,
    },
    "& a:hover": {
        backgroundColor: "#f4f0ff",
        color: "#7c3aed",
    },
}