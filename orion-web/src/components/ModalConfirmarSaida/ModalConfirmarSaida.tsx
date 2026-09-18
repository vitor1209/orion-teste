import { Dialog, Stack, Typography } from "@mui/material"
import { Button } from "@/components/Button/Button"
import type { ModalConfirmarSaidaProps } from "./ModalConfirmarSaida.types"
import * as styles from "./ModalConfirmarSaida.styles"

export const ModalConfirmarSaida = ({ aberto, aoConfirmar, aoCancelar }: ModalConfirmarSaidaProps) => {
    return (
        <Dialog open={aberto} onClose={aoCancelar} slotProps={{ paper: { sx: styles.papel } }}>
            <Typography sx={styles.titulo}>Sair da atividade?</Typography>
            <Typography sx={styles.texto}>
                Se você sair agora, vai perder todo o progresso feito nesta atividade.
            </Typography>

            <Stack sx={styles.linhaBotoes}>
                <Button variante="BrancoComBorda" tamanho="md" onClick={aoCancelar}>
                    Continuar praticando
                </Button>
                <Button variante="Vermelho" tamanho="md" onClick={aoConfirmar}>
                    Sair mesmo assim
                </Button>
            </Stack>
        </Dialog>
    )
}
