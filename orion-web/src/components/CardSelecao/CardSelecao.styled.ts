import type { SxProps, Theme } from "@mui/material"
import type { CardSelecaoVariante } from "./CardSelecao.types"

export const Card = (variante: CardSelecaoVariante): SxProps<Theme> =>
    variante === "instrumento"
        ? {
              position: "relative",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              minHeight: { xs: 190, sm: 220 },
              p: { xs: "24px 20px 14px", sm: "30px 24px 14px" },
              borderRadius: 3,
              background: "#ffffff",
              border: "1px solid rgba(124, 92, 255, 0.14)",
              boxShadow: "0 12px 24px rgba(77, 44, 176, 0.08)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 18px 38px rgba(77, 44, 176, 0.14)",
              },
          }
        : {
              width: "min(400px, calc(100vw - 32px))",
              minHeight: 160,
              background: "white",
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              p: { xs: 2.5, sm: 3 },
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
              cursor: "pointer",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 32px rgba(0, 0, 0, 0.18)",
              },
              "&:active": {
                  transform: "translateY(-1px) scale(0.98)",
              },
          }

export const conteudo = (variante: CardSelecaoVariante): SxProps<Theme> => ({
    display: "flex",
    flexDirection: "column",
    gap: 0.75,
    position: "relative",
    zIndex: 2,
    ...(variante === "modo" && { maxWidth: "min(245px, calc(100% - 104px))" }),
})

export const iconeModo: SxProps<Theme> = {
    width: { xs: 118, sm: 138 },
    height: { xs: 118, sm: 138 },
    objectFit: "contain",
    flexShrink: 0,
    pointerEvents: "none",
    filter: "drop-shadow(0 12px 12px rgba(45, 33, 79, 0.18))",
    position: "absolute",
    right: { xs: -8, sm: -6 },
    bottom: { xs: -24, sm: -30 },
    zIndex: 1,
}

export const wrapperImagemInstrumento: SxProps<Theme> = {
    mt: "auto",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
    minHeight: 90,
}

export const imagemInstrumento: SxProps<Theme> = {
    width: "100%",
    objectFit: "contain",
    transform: "translateY(12px)",
}