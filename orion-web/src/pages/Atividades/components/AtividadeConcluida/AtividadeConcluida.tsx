import { Box, Typography } from "@mui/material"
import { PartyPopper } from "lucide-react"
import { Button } from "@/components/Button/Button"
import * as styles from "./AtividadeConcluida.styles"
import { useAtividadeConcluida } from "./AtividadeConcluida.hook"

export type AtividadeConcluidaProps = {
    rotaVoltar: string
    atividadeId?: number
    titulo?: string
    descricao?: string
}

export const AtividadeConcluida = ({
    titulo = "Você aprendeu todos os gestos!",
    descricao = "As 7 notas da escala foram concluídas.",
    ...props
}: AtividadeConcluidaProps) => {
    const { onSubmit } = useAtividadeConcluida(props)
    return (
        <Box sx={styles.wrapper}>
            <PartyPopper size={48} color="#7C3AED" />
            <Typography sx={styles.titulo}>{titulo}</Typography>
            <Typography sx={styles.descricao}>
                {descricao}
            </Typography>

            <Button variante="Gradiente" tamanho="md" to={props.rotaVoltar} onClick={onSubmit}>
                Voltar para as atividades
            </Button>
        </Box>
    )
}
