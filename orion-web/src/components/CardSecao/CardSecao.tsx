import { Avatar, Stack, Typography } from "@mui/material"
import { User } from "lucide-react"
import type { CardSecaoProps } from "./CardSecao.types"
import * as styles from "./CardSecao.styles"

export const CardSecao = ({
    titulo,
    descricao,
    imagem,
    mostrarAvatar = true,
    className,
    children,
}: CardSecaoProps) => {
    return (
        <Stack sx={styles.cartao} className={className}>
            <Stack sx={styles.cabecalho}>
                {mostrarAvatar && (
                    <Avatar src={imagem} sx={styles.avatar}>
                        {!imagem && <User size={28} strokeWidth={1.6} />}
                    </Avatar>
                )}

                <Stack>
                    <Typography sx={styles.titulo}>{titulo}</Typography>

                    {descricao && (
                        <Typography sx={styles.descricao}>
                            {descricao}
                        </Typography>
                    )}
                </Stack>
            </Stack>

            {children}
        </Stack>
    )
}