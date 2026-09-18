import type { SxProps, Theme } from "@mui/material"

type VarianteIlustracao = "estatica" | "loop" | "miniatura"

const TAMANHOS: Record<
    VarianteIlustracao,
    { largura: number | string | { xs: string; md: string }; altura?: number | string }
> = {
    estatica: { largura: { xs: "100%", md: "50%" } },
    loop: { largura: { xs: "100%", md: "50%" } },
    miniatura: { largura: "100%" },
}

export const container = (
    variante: VarianteIlustracao
): SxProps<Theme> => ({
    position: "relative",
    width: TAMANHOS[variante].largura,
    aspectRatio: "10 / 6",
    borderRadius: variante === "miniatura" ? "12px" : "16px",
    overflow: "hidden",
    backgroundColor: "#f4f0ff",
    border: "1px solid #e3d6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

export const imagem = (
    variante: VarianteIlustracao
): SxProps<Theme> => ({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    opacity: 0.9,
    padding: variante === "miniatura" ? "0" : "20px",
    boxSizing: "border-box",
})

export const distintivoLoop: SxProps<Theme> = {
    position: "absolute",
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: "100%",
    backgroundColor: "#7C3AED",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

export const legenda: SxProps<Theme> = {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: '"Ubuntu", "Inter", sans-serif',
    fontSize: "0.78rem",
    color: "#71717a",
    padding: "0 12px",
}
