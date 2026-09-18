import { Stack, Typography } from "@mui/material"

import type { LogsLuvaProps } from "./LogsLuva.types"
import { lista } from "./LogsLuva.styles"

export const LogsLuva = ({ logs }: LogsLuvaProps) => {
    return (
        <Stack sx={{ mt: 2, width: "100%" }} >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Logs da Luva:
            </Typography>

            <Stack sx={lista}>
                {logs.length === 0 ? (
                    <Typography variant="caption" color="text.secondary">
                        Nenhum evento ainda
                    </Typography>
                ) : (
                    logs.map((log, indice) => (
                        <Typography
                            key={indice}
                            sx={{
                                fontSize: 12,
                                mb: 0.5,
                            }}
                        >
                            {log.horario} - {log.mensagem}
                        </Typography>
                    ))
                )}
            </Stack>
        </Stack>
    )
}