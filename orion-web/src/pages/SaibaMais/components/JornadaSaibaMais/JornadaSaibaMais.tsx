import { Box, Typography } from "@mui/material"

import type { JornadaSaibaMaisProps } from "./JornadaSaibaMais.types"
import { conteudo, descricao, etapa, eyebrow, listaEtapas, numeroEtapa, secao, textoEtapa, titulo } from "./JornadaSaibaMais.styles"

export const JornadaSaibaMais = ({ etapas }: JornadaSaibaMaisProps) => {
    return (
        <Box className="saiba-reveal" sx={secao}>
            <Box sx={conteudo}>
                <Typography sx={eyebrow}>Como a jornada acontece</Typography>
                <Typography sx={titulo}>Do primeiro clique à primeira prática</Typography>
                <Typography sx={descricao}>
                    O fluxo foi criado para não intimidar quem está começando. O usuário escolhe como quer interagir, qual instrumento deseja
                    explorar e segue por atividades organizadas.
                </Typography>
            </Box>

            <Box className="saiba-step-list" sx={listaEtapas}>
                {etapas.map((textoDaEtapa, indice) => (
                    <Box className="saiba-step-item" key={textoDaEtapa} sx={etapa}>
                        <Box component="span" sx={numeroEtapa}>
                            {String(indice + 1).padStart(2, "0")}
                        </Box>
                        <Typography sx={textoEtapa}>{textoDaEtapa}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}