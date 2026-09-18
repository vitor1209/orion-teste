import { Stack, Typography } from "@mui/material"
import { InputControlado } from "@/components/InputControlado/InputControlado"
import { Button } from "@/components/Button/Button"
import { useLogin } from "./Login.hook"
import * as styles from "../../Auth.styles"

export const Login = () => {
    const { control, errors, isSubmitting, handleSubmit, enviarLogin } = useLogin()

    return (
        <Stack sx={styles.conteudoAba}>
            <Stack sx={styles.cabecalhoAba}>
                <Typography sx={styles.tituloAba}>Bem-vindo de volta</Typography>
                <Typography sx={styles.subtituloAba}>
                    Continue de onde parou na sua jornada musical.
                </Typography>
            </Stack>

            <Stack component="form" sx={styles.formularioAba} onSubmit={handleSubmit(enviarLogin)}>
                <InputControlado
                    name="email"
                    label="Email"
                    placeholder="Entre com seu email"
                    tipo="email"
                    control={control}
                    errors={errors}
                    disabled={isSubmitting}
                    autoComplete="email"
                />

                <InputControlado
                    name="senha"
                    label="Senha"
                    placeholder="Digite sua senha"
                    tipo="password"
                    control={control}
                    errors={errors}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                />

                <Typography component="a" href="#recuperar-senha" sx={styles.esqueceuSenha}>
                    Esqueceu sua senha?
                </Typography>

                <Button type="submit" variante="Gradiente" tamanho="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
            </Stack>
        </Stack>
    )
}
