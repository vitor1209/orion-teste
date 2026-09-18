import { Dialog, Stack, Typography } from "@mui/material"
import { LogIn } from "lucide-react"
import { Button } from "@/components/Button/Button"
import type { ModalExigirLoginProps } from "./ModalExigirLogin.types"
import * as styles from "./ModalExigirLogin.styles"

export const ModalExigirLogin = ({ aberto, aoIrParaInicio, aoFazerLogin }: ModalExigirLoginProps) => {
    return (
        <Dialog open={aberto} slotProps={{ paper: { sx: styles.papel } }}>
            <Typography sx={styles.titulo}>Faça login para continuar</Typography>
            <Typography sx={styles.texto}>
                O modo guiado acompanha seu progresso e por isso exige uma conta. Entre com seu login ou
                crie uma conta para continuar.
            </Typography>

            <Stack sx={styles.linhaBotoes}>
                <Button variante="Gradiente" tamanho="md" onClick={aoIrParaInicio}>
                    Ir para o início
                </Button>

                <Button variante="Gradiente" tamanho="md" icon={LogIn} onClick={aoFazerLogin}>
                    Fazer login
                </Button>
            </Stack>
        </Dialog>
    )
}
