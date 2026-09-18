import { Box, Stack, Typography } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/Button/Button"
import { Footer } from "@/components/Footer/Footer"
import { BarraProgresso } from "@/components/BarraProgresso/BarraProgresso"
import { GradeAtividades } from "@/components/GradeAtividades/GradeAtividades"
import { useSelecaoAtividade } from "./SelecaoAtividade.hook"
import * as styles from "./SelecaoAtividade.styles"
import { PainelFiltrosAtividade } from "./components/PainelFiltrosAtividade/PainelFiltrosAtividade"
import { useAuth } from "@/hooks/auth/auth.hook"

export const SelecaoAtividade = () => {
    const {
        busca,
        setBusca,
        statusSelecionado,
        setStatusSelecionado,
        conteudoSelecionado,
        alternarConteudoSelecionado,
        atividadesFiltradas,
        atividadesConcluidas,
        totalAtividades,
        selecionarAtividade,
        voltar,
    } = useSelecaoAtividade()

    const {usuario} = useAuth()

    return (
        <Box sx={styles.pagina}>
            <Box sx={styles.layout}>
                <PainelFiltrosAtividade
                    nomeUsuario={usuario?.nome ?? "-"}
                    busca={busca}
                    aoAlterarBusca={setBusca}
                    statusSelecionado={statusSelecionado}
                    aoSelecionarStatus={setStatusSelecionado}
                    conteudoSelecionado={conteudoSelecionado}
                    aoSelecionarConteudo={alternarConteudoSelecionado}
                />

                <Box component="main" sx={styles.main}>
                    <Box sx={styles.acaoTopo}>
                        <Button variante="Voltar" tamanho="md" icon={ArrowLeft} onClick={voltar}>
                            Voltar
                        </Button>
                    </Box>

                    <Stack sx={styles.conteudo}>
                        <Typography sx={styles.titulo}>Bem-vindo de volta!</Typography>

                        <BarraProgresso concluidas={atividadesConcluidas} total={totalAtividades} />

                        <GradeAtividades
                            atividades={atividadesFiltradas}
                            aoSelecionarAtividade={selecionarAtividade}
                        />
                    </Stack>
                </Box>
            </Box>

            <Footer />
        </Box>
    )
}