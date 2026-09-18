import type { SxProps, Theme } from "@mui/material"

export const galeria: SxProps<Theme> = {
    position: "relative",
    display: "flex",
    minHeight: { xs: 430, sm: 520, md: 640 },
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: { xs: "74px", sm: "86px", md: "96px" },
}

export const orbita: SxProps<Theme> = {
    position: "absolute",
    width: "min(560px, 80vw)",
    height: "min(360px, 52vw)",
    border: "2px solid rgba(49, 197, 255, 0.72)",
    borderRadius: "50%",
    transform: "rotate(-15deg)",
    boxShadow: "0 0 26px rgba(49, 197, 255, 0.45), inset 0 0 26px rgba(170, 76, 255, 0.2)",
    animation: "orionOrbitFloat 8s ease-in-out infinite",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: "18%",
        border: "2px solid rgba(170, 76, 255, 0.64)",
        borderRadius: "50%",
        transform: "rotate(24deg)",
        boxShadow: "0 0 24px rgba(170, 76, 255, 0.42)",
    },
    "@keyframes orionOrbitFloat": {
        "0%, 100%": { transform: "rotate(-15deg) translateY(0)" },
        "50%": { transform: "rotate(-12deg) translateY(-10px)" },
    },
}

export const imagemPrincipal: SxProps<Theme> = {
    position: "relative",
    zIndex: 1,
    width: "min(520px, 82vw)",
    maxHeight: 520,
    objectFit: "contain",
    filter: "drop-shadow(0 24px 42px rgba(0, 0, 0, 0.52))",
    animation: "orionProductIn 0.42s ease both",
    "@keyframes orionProductIn": {
        from: { opacity: 0, transform: "translateY(16px) scale(0.97)" },
        to: { opacity: 1, transform: "translateY(0) scale(1)" },
    },
}

export const carrossel: SxProps<Theme> = {
    position: "absolute",
    left: "50%",
    bottom: 8,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: { xs: "8px", sm: "12px" },
    padding: { xs: "10px 12px", sm: "14px 18px" },
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: "22px",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 18px 34px rgba(0, 0, 0, 0.24)",
    transform: "translateX(-50%)",
}

export const botaoNavegacao: SxProps<Theme> = {
    width: 30,
    height: 30,
    border: 0,
    display: "grid",
    placeItems: "center",
    backgroundColor: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    transition: "transform 0.2s ease, color 0.2s ease",
    "&:hover": {
        color: "#c989ff",
        transform: "scale(1.12)",
    },
}

export const miniatura = (ativa: boolean): SxProps<Theme> => ({
    width: { xs: 46, sm: 54 },
    height: { xs: 46, sm: 54 },
    border: ativa ? "2px solid #b95cff" : "2px solid transparent",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: ativa ? "0 0 18px rgba(185, 92, 255, 0.48)" : "none",
    transform: ativa ? "translateY(-2px)" : "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    padding: 0,
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    "&:hover": {
        transform: "translateY(-2px)",
    },
})