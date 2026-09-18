import type { SxProps, Theme } from "@mui/material"
import type { CardBeneficioVariante } from "./CardBeneficio.types"

export const card = (variante: CardBeneficioVariante): SxProps<Theme> =>
    variante === "pilar"
        ? {
              minHeight: 390,
              padding: "26px",
              border: "1px solid rgba(142, 170, 255, 0.62)",
              borderRadius: "30px",
              backgroundColor: "#ffffff",
              boxShadow: "0 16px 34px rgba(33, 48, 84, 0.08)",
              transition: "transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease",

              "&:hover": {
                  transform: "translateY(-7px)",
                  borderColor: "#a874ff",
                  boxShadow: "0 22px 42px rgba(33, 48, 84, 0.13)",
              },

              "&:hover img": {
                  transform: "scale(1.05)",
              },
          }
        : {
              minHeight: 190,
              padding: "28px",
              border: "1px solid rgba(142, 170, 255, 0.72)",
              borderRadius: "24px",
              background: "linear-gradient(145deg, #ffffff, #f4f6ff)",
              boxShadow: "0 18px 34px rgba(33, 48, 84, 0.1)",
              transition: "transform 0.22s ease, box-shadow 0.22s ease",

              "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 24px 44px rgba(33, 48, 84, 0.16)",
              },
          }

export const icone: SxProps<Theme> = {
    width: 54,
    height: 54,
    display: "grid",
    placeItems: "center",
    marginBottom: "22px",
    borderRadius: "18px",
    backgroundColor: "#efe7ff",
    color: "#9f4cff",
}

export const molduraImagem: SxProps<Theme> = {
    height: 176,
    display: "grid",
    placeItems: "center",
    marginBottom: "26px",
    borderRadius: "24px",
    backgroundColor: "#f3f5ff",
    overflow: "hidden",
}

export const imagem: SxProps<Theme> = {
    width: "82%",
    height: 142,
    objectFit: "contain",
    transition: "transform 0.24s ease",
}

export const titulo = (variante: CardBeneficioVariante): SxProps<Theme> => ({
    marginBottom: "12px",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: variante === "pilar" ? "1.32rem" : "1.25rem",
    fontWeight: 800,
})

export const descricao = (variante: CardBeneficioVariante): SxProps<Theme> => ({
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: variante === "pilar" ? "0.96rem" : "0.98rem",
    lineHeight: variante === "pilar" ? 1.55 : 1.5,
    color: variante === "pilar" ? "#4f5870" : "#4b5568",
})
