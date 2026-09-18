import { CircularProgress, Stack, Typography } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/Button/Button"
import { FundoEstrelado } from "@/components/FundoEstrelado/FundoEstrelado"
import type { AvisoAtividadeProps } from "./AvisoAtividade.types"
import { TEXTOS_AVISO } from "./AvisoAtividade.utils"
import * as styles from "./AvisoAtividade.styles"

export const AvisoAtividade = ({ estado, rotaVoltar }: AvisoAtividadeProps) => {
    const carregando = estado === "carregando"
    const { titulo, descricao } = TEXTOS_AVISO[estado]

    return (
        <FundoEstrelado variante="tela" comBrilhoCentral sx={styles.pagina}>
            <Stack sx={styles.conteudo}>
                {carregando && <CircularProgress size={44} sx={styles.progresso} />}

                <Typography sx={styles.titulo}>{titulo}</Typography>
                <Typography sx={styles.descricao}>{descricao}</Typography>

                {!carregando && (
                    <Button
                        variante="Gradiente"
                        tamanho="lg"
                        icon={ArrowLeft}
                        ladoIcon="esquerda"
                        to={rotaVoltar}
                    >
                        Voltar para as atividades
                    </Button>
                )}
            </Stack>
        </FundoEstrelado>
    )
}
