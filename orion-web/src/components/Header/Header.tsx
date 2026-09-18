import { ArrowLeft } from "lucide-react"
import { Box, Stack, Typography } from "@mui/material"
import logoImg from "@/assets/images/logo.png"
import type { HeaderProps } from "./Header.types"
import { header, linha, logo, tagline } from "./Header.styles"
import { Button } from "../Button/Button"
import { useNavigate } from "react-router"

export const Header = ({ tagline: textoTagline, rotaVoltar }: HeaderProps) => {
    const navigate = useNavigate()
    return (
        <Box component="header" sx={header}>
            <Stack
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 2.5,
                }}
            >
                <Box
                    component="img"
                    src={logoImg}
                    alt="Orion"
                    sx={logo}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate("/", { viewTransition: true })}
                    onKeyDown={(evento) => {
                        if (evento.key === "Enter" || evento.key === " ") {
                            navigate("/", { viewTransition: true })
                        }
                    }}
                />

                <Button
                    variante="Voltar"
                    tamanho="md"
                    to={rotaVoltar}
                    icon={ArrowLeft}
                    ladoIcon="esquerda"
                >
                    Voltar
                </Button>
            </Stack>

            <Typography component="p" sx={tagline}>
                {textoTagline}
            </Typography>

            <Box sx={linha} />
        </Box>
    )
}