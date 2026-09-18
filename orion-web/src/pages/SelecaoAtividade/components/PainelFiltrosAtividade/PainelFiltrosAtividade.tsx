import { Box, Stack, TextField, Typography } from "@mui/material"
import { ChevronDown, Search, UserCircle } from "lucide-react"
import { usePainelFiltrosAtividade } from "./PainelFiltrosAtividade.hook"
import { OPCOES_CONTEUDO, OPCOES_STATUS } from "./PainelFiltrosAtividade.utils"
import type { PainelFiltrosAtividadeProps } from "./PainelFiltrosAtividade.types"
import * as styles from "./PainelFiltrosAtividade.styles"
import { Button } from "../../../../components/Button/Button"

export const PainelFiltrosAtividade = ({
    nomeUsuario,
    busca,
    aoAlterarBusca,
    statusSelecionado,
    aoSelecionarStatus,
    conteudoSelecionado,
    aoSelecionarConteudo,
}: PainelFiltrosAtividadeProps) => {
    const { filtrosAbertos, alternarFiltros } = usePainelFiltrosAtividade()

    return (
        <Box component="aside" sx={styles.painel}>
            <Stack sx={styles.areaUsuario}>
                <Box sx={styles.avatarUsuario}>
                    <UserCircle size={62} />
                </Box>

                <Box>
                    <Typography sx={styles.nomeUsuario}>{nomeUsuario}</Typography>
                </Box>
            </Stack>

            <Stack sx={styles.filtros}>
                <Stack sx={styles.cabecalhoFiltros}>
                    <Typography sx={styles.tituloFiltros}>Filtros</Typography>
                    <Box
                        component="button"
                        type="button"
                        onClick={alternarFiltros}
                        aria-expanded={filtrosAbertos}
                        sx={styles.botaoAlternarFiltros}
                    >
                        {filtrosAbertos ? "Ocultar" : "Mostrar"}
                        <ChevronDown size={18} />
                    </Box>
                </Stack>

                <Stack sx={styles.conteudoFiltros(filtrosAbertos)}>
                    <TextField
                        size="small"
                        placeholder="Busque por um conteúdo"
                        value={busca}
                        onChange={(event) => aoAlterarBusca(event.target.value)}
                        sx={styles.campoBusca}
                        slotProps={{
                            input: { endAdornment: <Search size={18} /> },
                        }}
                    />

                    <Stack sx={styles.grupoFiltro}>
                        <Typography sx={styles.rotuloFiltro}>Status das atividades</Typography>
                        <Stack sx={styles.botoesFiltro}>
                            {OPCOES_STATUS.map((status) => (
                                <Button
                                    key={status}
                                    variante="Filtro"
                                    tamanho="md"
                                    ativo={statusSelecionado === status}
                                    onClick={() => aoSelecionarStatus(status)}
                                >
                                    {status}
                                </Button>
                            ))}
                        </Stack>
                    </Stack>

                    <Stack sx={styles.grupoFiltro}>
                        <Typography sx={styles.rotuloFiltro}>Explorar conteúdos</Typography>
                        <Stack sx={styles.botoesFiltro}>
                            {OPCOES_CONTEUDO.map((conteudo) => (
                                <Button
                                    key={conteudo}
                                    variante="Filtro"
                                    tamanho="md"
                                    ativo={conteudoSelecionado === conteudo}
                                    onClick={() => aoSelecionarConteudo(conteudo)}
                                >
                                    {conteudo}
                                </Button>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

        </Box>
    )
}