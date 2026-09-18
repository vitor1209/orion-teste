import { Box, Stack, Typography } from "@mui/material"
import { InputControlado } from "@/components/InputControlado/InputControlado"
import { Button } from "@/components/Button/Button"
import { useCadastro } from "./Cadastro.hook"
import * as styles from "../../Auth.styles"

export const Cadastro = () => {
    const { control, errors, isSubmitting, handleSubmit, enviarCadastro, senha, forcaSenha } = useCadastro()

    return (
        <Stack sx={styles.conteudoAba}>
            <Stack sx={styles.cabecalhoAba}>
                <Typography sx={styles.tituloAba}>Crie sua conta</Typography>
                <Typography sx={styles.subtituloAba}>
                    Comece sua jornada musical com a Orion em poucos passos.
                </Typography>
            </Stack>

            <Stack component="form" sx={styles.formularioAba} onSubmit={handleSubmit(enviarCadastro)}>
                <InputControlado
                    name="nome"
                    label="Nome"
                    placeholder="Digite seu nome de usuário"
                    autoComplete="name"
                    control={control}
                    errors={errors}
                    disabled={isSubmitting}
                />

                <InputControlado
                    name="email"
                    label="Email"
                    placeholder="Entre com seu email"
                    tipo="email"
                    autoComplete="email"
                    control={control}
                    errors={errors}
                    disabled={isSubmitting}
                />

                <Stack>
                    <InputControlado
                        name="senha"
                        label="Digite sua senha"
                        placeholder="Escolha uma senha de acesso"
                        tipo="password"
                        autoComplete="new-password"
                        control={control}
                        errors={errors}
                        disabled={isSubmitting}
                    />

                    {senha.length > 0 && (
                        <Stack sx={styles.forcaSenha}>
                            <Box sx={styles.barraForca(forcaSenha)} />
                            <Typography sx={styles.textoForca}>
                                Senha {forcaSenha === "media" ? "média" : forcaSenha}
                            </Typography>
                        </Stack>
                    )}
                </Stack>

                <Button type="submit" variante="Gradiente" tamanho="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
            </Stack>
        </Stack>
    )
}
