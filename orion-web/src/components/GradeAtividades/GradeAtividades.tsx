import { Box, Typography } from "@mui/material"
import type { GradeAtividadesProps } from "./GradeAtividades.types"
import * as styles from "./GradeAtividades.styles"
import { CardAtividade } from "../CardAtividade/CardAtividade"

export const GradeAtividades = ({ atividades, aoSelecionarAtividade }: GradeAtividadesProps) => {
    return (

        <>
            <Box sx={styles.grade}>
                {atividades.map((atividade) => (
                    <CardAtividade
                        key={atividade.id}
                        atividade={atividade}
                        onClick={() => aoSelecionarAtividade(atividade)}
                    />
                ))}
            </Box>

            {atividades.length === 0 && (
                <Typography sx={styles.estadoVazio}>
                    Nenhuma atividade encontrada com esses filtros.
                </Typography>
            )}
        </>
    )
}