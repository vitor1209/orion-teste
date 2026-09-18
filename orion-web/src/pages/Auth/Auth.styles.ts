import type { SxProps, Theme } from "@mui/material"
import { keyframes } from "@emotion/react"

const flutuarAstro = keyframes`
    0%, 100% {
        transform: translate3d(0, 0, 0);
    }

    50% {
        transform: translate3d(0, -12px, 0);
    }
`

const surgirCartao = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, 22px, 0) scale(0.97);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
    }
`

export const pagina: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "112px 24px 72px",

    "@media (max-width: 600px)": {
        padding: "104px 18px 56px",
        alignItems: "flex-start",
    },
}

export const wrapperBotaoVoltar: SxProps<Theme> = {
    position: "absolute",
    top: 30,
    right: 42,
    zIndex: 4,

    "@media (max-width: 600px)": {
        top: 20,
        right: 18,
    },
}

export const constelacao: SxProps<Theme> = {
    position: "absolute",
    left: "7%",
    top: "20%",
    width: "clamp(180px, 18vw, 260px)",
    opacity: 0.72,
    pointerEvents: "none",
    animation: `${flutuarAstro} 8s ease-in-out infinite`,

    "@media (max-width: 900px)": {
        left: "4%",
        top: "18%",
        width: 170,
    },

    "@media (max-width: 600px)": {
        opacity: 0.24,
        width: 150,
        left: -22,
        top: 112,
    },

    "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
    },
}

export const lua: SxProps<Theme> = {
    position: "absolute",
    right: "8%",
    bottom: "13%",
    width: "clamp(170px, 16vw, 250px)",
    opacity: 0.7,
    pointerEvents: "none",
    animation: `${flutuarAstro} 9s ease-in-out infinite reverse`,

    "@media (max-width: 900px)": {
        right: "4%",
        width: 170,
    },

    "@media (max-width: 600px)": {
        opacity: 0.22,
        width: 150,
        right: -28,
        bottom: 24,
    },

    "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
    },
}

export const cartao: SxProps<Theme> = {
    position: "relative",
    zIndex: 2,
    width: "min(100%, 500px)",
    alignItems: "center",
    padding: "34px 52px 44px",
    border: "1px solid rgba(206, 216, 255, 0.72)",
    borderRadius: "36px",
    backgroundColor: "#ffffff",
    backdropFilter: "blur(20px)",
    boxShadow: "0 34px 100px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.94)",
    overflow: "hidden",
    animation: `${surgirCartao} 0.6s cubic-bezier(.2,.8,.2,1) both`,
    transition: "transform 0.28s ease, box-shadow 0.28s ease",

    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 40px 110px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.96)",
    },

    "@media (max-width: 900px)": {
        width: "min(100%, 460px)",
    },

    "@media (max-width: 600px)": {
        width: "100%",
        padding: "28px 22px 36px",
        borderRadius: "28px",
    },

    "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
        transition: "none",

        "&:hover": {
            transform: "none",
        },
    },
}

export const abas: SxProps<Theme> = {
    width: "100%",
    maxWidth: 340,
    marginBottom: "30px",
}

export const conteudoAba: SxProps<Theme> = {
    alignItems: "center",
    width: "100%",
}

export const logo: SxProps<Theme> = {
    width: 132,
    height: "auto",
    objectFit: "contain",
    marginBottom: "20px",
}

export const cabecalhoAba: SxProps<Theme> = {
    alignItems: "center",
    textAlign: "center",
    gap: "8px",
    marginBottom: "30px",
}

export const tituloAba: SxProps<Theme> = {
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "#101322",
    fontSize: "clamp(1.45rem, 4vw, 1.9rem)",
    fontWeight: 800,
    lineHeight: 1.15,
}

export const subtituloAba: SxProps<Theme> = {
    maxWidth: 340,
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    color: "#4f5668",
    fontSize: "clamp(0.94rem, 2.4vw, 1.02rem)",
    lineHeight: 1.55,
}

export const formularioAba: SxProps<Theme> = {
    width: "100%",
    gap: "18px",
}

export const esqueceuSenha: SxProps<Theme> = {
    alignSelf: "flex-end",
    marginTop: "-8px",
    color: "#5e3bb8",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.86rem",
    fontWeight: 700,
    textDecoration: "none",

    "&:hover": {
        textDecoration: "underline",
    },
}

export const forcaSenha: SxProps<Theme> = {
    marginTop: "10px",
    gap: "6px",
}

export const barraForca = (forca: "fraca" | "media" | "forte"): SxProps<Theme> => {
    const largura = forca === "forte" ? "100%" : forca === "media" ? "66%" : "34%"
    const cor = forca === "forte" ? "#22c55e" : forca === "media" ? "#AA4CFF" : "#C27DFF"

    return {
        height: 7,
        borderRadius: "999px",
        backgroundColor: "rgba(170, 76, 255, 0.13)",
        overflow: "hidden",

        "&::before": {
            content: '""',
            display: "block",
            width: largura,
            height: "100%",
            borderRadius: "inherit",
            backgroundColor: cor,
            transition: "width 0.25s ease, background-color 0.25s ease",
        },
    }
}

export const textoForca: SxProps<Theme> = {
    color: "#5b6474",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.78rem",
    fontWeight: 700,
}
