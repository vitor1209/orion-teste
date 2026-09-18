import { Dialog, Typography } from "@mui/material"
import { Button } from "@/components/Button/Button"
import type { ModalPedidoConcluidoProps } from "@/pages/FinalizarPedido/FinalizarPedido.types"
import * as styles from "./ModalPedidoConcluido.styles"

export const ModalPedidoConcluido = ({ aberto, aoFechar }: ModalPedidoConcluidoProps) => {
    return (
        <Dialog open={aberto} onClose={aoFechar} slotProps={{ paper: { sx: styles.papel } }}>
            <Typography sx={styles.titulo}>Compra realizada com sucesso!</Typography>
            <Typography sx={styles.texto}>
                Recebemos seu pedido! Você pode acompanhar todas as atualizações na sua página de perfil.
            </Typography>
            <Typography sx={styles.texto}>Agradecemos pela escolha</Typography>

            <Button variante="Gradiente" tamanho="lg" onClick={aoFechar} sx={styles.botao}>
                Voltar
            </Button>
        </Dialog>
    )
}
