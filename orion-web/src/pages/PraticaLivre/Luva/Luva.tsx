import { Stack } from "@mui/material"
import { ArrowLeft } from "lucide-react"
import { useLuvaPage } from "./Luva.hook"
import { PainelAjustes } from "@/components/PainelAjustes/PainelAjustes"
import { Button } from "@/components/Button/Button"
import { CartaoPiano } from "./components/CartaoPiano/CartaoPiano"
import { Partitura } from "@/components/Partitura/Partitura"
import { Footer } from "@/components/Footer/Footer"
import { EyebrowLabel, PageSubtitle, PageTitle } from "./Luva.styled"
import type { PaginaAtividadeProps } from "@/pages/Atividades/Atividade.types"

export const LuvaPage = ({ atividade, rotaVoltar }: PaginaAtividadeProps) => {
    const {
        oitava,
        alterarOitava,
        conectado,
        alternarConexao,
        primeiraNota,
        ultimaNota,
        larguraPiano,
        notaAtiva,
        tocarNota,
        notas,
        limparNotas,
        removerUltimaNota,
        rotaVoltar: rotaVoltarPadrao,
    } = useLuvaPage()

    return (
        <>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                    minHeight: "100vh",
                    width: "100%",
                }}
            >
                <PainelAjustes
                    oitava={oitava}
                    aoAlterarOitava={alterarOitava}
                    conectado={conectado}
                    aoAlternarConexao={alternarConexao}
                />

                <Stack
                    sx={{
                        width: { xs: "100%", md: "70%" },
                        alignItems: "flex-end",
                        p: { xs: "24px 16px", md: "5% 5% 5% 0" },
                    }}
                >
                    <Button
                        variante="Voltar"
                        tamanho="md"
                        to={rotaVoltar ?? rotaVoltarPadrao}
                        icon={ArrowLeft}
                        ladoIcon="esquerda"
                    >
                        Voltar
                    </Button>

                    <Stack
                        sx={{
                            width: "100%",
                        }}
                    >
                        {atividade && (
                            <Stack>
                                <EyebrowLabel>{atividade.categoria}</EyebrowLabel>
                                <PageTitle>{atividade.titulo}</PageTitle>
                                <PageSubtitle>{atividade.descricao}</PageSubtitle>
                            </Stack>
                        )}

                        <CartaoPiano
                            oitava={oitava}
                            primeiraNota={primeiraNota}
                            ultimaNota={ultimaNota}
                            larguraPiano={larguraPiano}
                            notaAtiva={notaAtiva}
                            aoTocarNota={tocarNota}
                        />

                        <Partitura
                            notas={notas}
                            onClear={limparNotas}
                            onRemoverUltimaNota={removerUltimaNota}
                        />

                        {/* <LogsLuva logs={logs} /> */}
                    </Stack>
                </Stack>
            </Stack>

            <Footer />
        </>
    )
}
