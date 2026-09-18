import { Box } from "@mui/material"
import { Minus, Plus } from "lucide-react"
import type { ControleQuantidadeProps } from "./ControleQuantidade.types"
import * as styles from "./ControleQuantidade.styles"

export const ControleQuantidade = ({
    quantidade,
    aoDiminuir,
    aoAumentar,
    variante = "padrao",
    desabilitarDiminuir = false,
    ariaLabel = "Selecionar quantidade",
}: ControleQuantidadeProps) => {
    return (
        <Box sx={styles.controle(variante)} aria-label={ariaLabel}>
            <Box
                component="button"
                type="button"
                onClick={aoDiminuir}
                aria-label="Diminuir quantidade"
                disabled={desabilitarDiminuir}
                sx={styles.botao(variante)}
            >
                <Minus size={variante === "compacto" ? 14 : 16} />
            </Box>

            <Box component={variante === "compacto" ? "strong" : "span"} sx={styles.valor}>
                {quantidade}
            </Box>

            <Box
                component="button"
                type="button"
                onClick={aoAumentar}
                aria-label="Aumentar quantidade"
                sx={styles.botao(variante)}
            >
                <Plus size={variante === "compacto" ? 14 : 16} />
            </Box>
        </Box>
    )
}