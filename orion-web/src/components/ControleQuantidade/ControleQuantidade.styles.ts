import type { SxProps, Theme } from "@mui/material"

export const controle = (variante: "padrao" | "compacto"): SxProps<Theme> =>
    variante === "compacto"
        ? {
              minWidth: 82,
              height: 30,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              border: "1px solid #8eaaff",
              borderRadius: 999,
              backgroundColor: "#f6f8ff",
              color: "#080a14",
              fontFamily: '"Ubuntu", "Inter", sans-serif',
          }
        : {
              minWidth: 96,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              border: "2px solid #ffffff",
              borderRadius: 999,
              color: "#ffffff",
              fontFamily: '"Ubuntu", "Inter", sans-serif',
              fontWeight: 800,
          }

export const botao = (variante: "padrao" | "compacto"): SxProps<Theme> =>
    variante === "compacto"
        ? {
              width: 22,
              height: 22,
              border: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              backgroundColor: "transparent",
              color: "#080a14",
              cursor: "pointer",
              transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
              "&:hover:not(:disabled)": {
                  backgroundColor: "#8eaaff",
                  color: "#ffffff",
                  transform: "scale(1.08)",
              },
              "&:disabled": {
                  opacity: 0.35,
                  cursor: "not-allowed",
              },
          }
        : {
              width: 26,
              height: 26,
              border: 0,
              display: "grid",
              placeItems: "center",
              backgroundColor: "transparent",
              color: "#ffffff",
              cursor: "pointer",
              transition: "transform 0.18s ease",
              "&:hover": {
                  transform: "scale(1.16)",
              },
          }

export const valor: SxProps<Theme> = {
    minWidth: 14,
    textAlign: "center",
    fontWeight: 800,
}