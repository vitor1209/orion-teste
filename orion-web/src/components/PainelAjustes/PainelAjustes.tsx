import { Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import type { PainelAjustesProps } from "./PainelAjustes.types"
import { conteudo, fundo, grupoOitavas, painel } from "./PainelAjustes.styles"
import { Button } from "../Button/Button"
import { OITAVAS } from "../../pages/PraticaLivre/Luva/Luva.utils"

export const PainelAjustes = ({ oitava, aoAlterarOitava, conectado, aoAlternarConexao }: PainelAjustesProps) => {
    return (
        <Stack sx={painel}>
            <Stack sx={conteudo}>
                <Typography variant="h5" color="text.secondary">
                    Ajustes:
                </Typography>

                <Stack sx={{ mt: 2 }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 0.5 }}>
                        Oitava:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Selecione a oitava desejada
                    </Typography>

                    <ToggleButtonGroup value={oitava} exclusive onChange={aoAlterarOitava} sx={grupoOitavas}>
                        {OITAVAS.map((valor) => (
                            <ToggleButton key={valor} value={valor}>
                                {valor}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>

                <Stack sx={{ mt: 2 }}>
                    <Button variante={conectado ? "Vermelho" : "Gradiente"} tamanho="md" onClick={aoAlternarConexao} sx={{ ml: 2 }}>
                        {conectado ? "Desconectar Luva" : "Conectar Luva"}
                    </Button>
                </Stack>
            </Stack>

            <Stack sx={fundo} />
        </Stack>
    )
}