import { Box, Chip, Typography } from "@mui/material"
import { Check } from "lucide-react"
import type { CardAtividadeProps } from "./CardAtividade.types"
import * as styles from "./CardAtividade.styles"
import { StatusAtividade } from "../../api/models/SelecaoAtividade.types"

export const CardAtividade = ({ atividade, onClick }: CardAtividadeProps) => {
    return (
        <Box onClick={onClick} sx={styles.cartao(atividade.status)}>
            <Chip label={atividade.categoria} size="small" sx={styles.chipNivel} />
            <Typography sx={styles.titulo}>{atividade.titulo}</Typography>
            <Typography sx={styles.descricao}>{atividade.subTitulo}</Typography>

            {atividade.status === StatusAtividade.Concluida && (
                <Box sx={styles.marcaConcluida}>
                    <Check size={22} />
                </Box>
            )}
        </Box>
    )
}