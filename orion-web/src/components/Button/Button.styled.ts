import { ButtonBase, styled } from "@mui/material"
import type { CSSObject } from "@mui/material"

const hoverEscala: CSSObject = {
    transition: "transform 0.3s",
    "&:hover": {
        transform: "scale(1.05)",
    },
}

const escalaHover: CSSObject = {
    transform: "scale(1.05)",
}

const hoverElevar: CSSObject = {
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
        filter: "none",
        transform: "translateY(-1px)",
    },
}

const elevarHover: CSSObject = {
    filter: "none",
    transform: "translateY(-1px)",
}

export const ButtonVariants = styled(ButtonBase, {
    shouldForwardProp: (prop) =>
        prop !== "tamanho" &&
        prop !== "espacamento" &&
        prop !== "variante" &&
        prop !== "ativo",
})<{
    tamanho: "sm" | "md" | "lg" | "xl"
    espacamento: number
    ativo?: boolean
    variante:
    | "Branco"
    | "Roxo"
    | "Gradiente"
    | "Preto"
    | "Vermelho"
    | "Voltar"
    | "Icone"
    | "Filtro"
    | "Finalizar"
    | "BrancoComBorda"

}>(({ tamanho, espacamento, variante, ativo }) => {
    const sizeMap = {
        sm: { height: 30, fontSize: 14 },
        md: { height: 37, fontSize: 17 },
        lg: { height: 48, fontSize: 22 },
        xl: { height: 51, fontSize: 24.2 },
    }

    const { height, fontSize } = sizeMap[tamanho]

    return {
        width: "auto",
        minHeight: height,
        paddingInline: espacamento,
        fontSize,
        fontFamily: '"Ubuntu", "Inter", sans-serif',
        overflow: "hidden",
        borderRadius: "999px",
        fontWeight: 500,
        alignItems: "center",
        gap: 10,
        transition: "opacity 0.5s",
        textDecoration: "none",
        color: "inherit",
        padding: "12px 28px",

        "&:hover": {
            filter: "brightness(80%)",
        },

        "&:disabled, &.disabled": {
            opacity: 0.8,
            background: "grey !important",
            color: "white !important",
            cursor: "not-allowed",
            pointerEvents: "none",
        },

        ...(variante === "Branco" && {
            color: "white",
            border: "solid 2px white",
            ...hoverEscala,

            "&:hover": {
                ...escalaHover,
                border: "2px solid #fff",
                background: "rgba(255,255,255,0.06)",
            },
        }),

        ...(variante === "Roxo" && {
            background: "#8b5cf6",
            color: "white",
            borderRadius: 12,
            ...hoverEscala,

            "&:hover": {
                ...escalaHover,
                background: "#7c3aed",
            },
        }),

        ...(variante === "Gradiente" && {
            background: "linear-gradient(90deg,#b05cff,#8b5cf6)",
            color: "white",
            ...hoverEscala,

            "&:hover": {
                ...escalaHover,
                background: "linear-gradient(90deg, #9d4cff, #7c3aed)",
            },
        }),

        ...(variante === "Preto" && {
            background: "#111",
            color: "white",
            alignSelf: "flex-start",
            borderRadius: 12,
            ...hoverEscala,

            "&:hover": {
                ...escalaHover,
                background: "#333",
            },
        }),

        ...(variante === "BrancoComBorda" && {
            background: "white",
            color: "#111",
            // alignSelf: "flex-start",
            border: "2px solid #5a4d4d",
            borderRadius: 12,
            ...hoverEscala,

            "&:hover": {
                ...escalaHover,
                background: "#030303",
                border: "2px solid #fff",
                color: "#fff",
            },
        }),

        ...(variante === "Voltar" && {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
            minHeight: "auto",
            padding: "12px 20px",
            border: "1px solid rgba(95, 74, 248, 0.18)",
            borderRadius: 999,
            backgroundColor: "#ffffff",
            color: "#2d214f",
            fontSize: "0.95rem",
            fontWeight: 700,
            lineHeight: "normal",
            textTransform: "none",
            ...hoverElevar,

            "&:hover": {
                ...elevarHover,
                backgroundColor: "#ffffff",
                boxShadow: "0 16px 36px rgba(95, 74, 248, 0.12)",
            },

            "& > span": {
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
            },

            "@media (max-width: 520px)": {
                padding: "10px 16px",
                fontSize: "0.88rem",
            },
        }),

        ...(variante === "Icone" && {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            minWidth: 0,
            width: height,
            height,
            borderRadius: "50%",
            background: "linear-gradient(90deg,#b05cff,#8b5cf6)",
            color: "white",
            ...hoverEscala,

            "&:hover": {
                ...escalaHover,
                background:
                    "linear-gradient(90deg, #9d4cff, #7c3aed)",
                filter: "none",
            },

            "& > span": {
                display: "none",
            },
        }),

        ...(variante === "Vermelho" && {
            background: "linear-gradient(90deg,#EF4444,#DC2626)",
            color: "white",
            borderRadius: 12,

            "&:hover": {
                opacity: 0.5,
            },
        }),

        ...(variante === "Filtro" && {
            width: 128,
            height: 28,
            minHeight: "auto",
            padding: 0,
            borderRadius: 999,
            border: "1px solid #82a0ff",
            backgroundColor: ativo ? "#8eaaff" : "#ffffff",
            color: ativo ? "#ffffff" : "#667089",
            fontFamily: '"Ubuntu", "Inter", sans-serif',
            fontSize: "0.88rem",
            fontWeight: 400,
            ...hoverElevar,

            "&:hover": {
                ...elevarHover,
                backgroundColor: "#8eaaff",
                color: "#ffffff",
            },

            "&:focus-visible": {
                outline: "3px solid rgba(142, 170, 255, 0.35)",
                outlineOffset: 2,
            },
        }),

        ...(variante === "Finalizar" && {
            width: "100%",
            borderRadius: 999,
            backgroundColor: ativo ? "#4f6fdc" : "#a8bcff",
            color: "#ffffff",
            fontWeight: 800,
            opacity: ativo ? 1 : 0.72,
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, background 0.2s ease",

            "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent)",
                transform: "translateX(-120%)",
                transition: "transform 0.55s ease",
            },

            "&:hover": {
                filter: ativo ? "brightness(1.03)" : "none",
                transform: ativo ? "translateY(-2px)" : "none",
                boxShadow: ativo ? "0 10px 18px rgba(79, 111, 220, 0.28)" : "none",
            },

            "&:hover::after": {
                transform: ativo ? "translateX(120%)" : "translateX(-120%)",
            },
        }),
    }
})