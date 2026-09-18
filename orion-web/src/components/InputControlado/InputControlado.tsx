import { useState, type Ref } from "react"
import type { InputBaseComponentProps } from "@mui/material/InputBase"
import { Controller, type FieldValues } from "react-hook-form"
import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { Eye, EyeOff } from "lucide-react"
import { IMaskInput } from "react-imask"
import type { InputControladoProps } from "./InputControlado.types"
import * as styles from "./InputControlado.styles"

const AdaptadorMascara = ({
    mascara,
    ref,
    onChange,
    ...props
}: InputBaseComponentProps & {
    mascara?: string
    ref?: Ref<HTMLInputElement>
}) => {
    return (
        <IMaskInput
            {...props}
            mask={mascara ?? ""}
            inputRef={ref}
            onAccept={(valor: string) => {
                onChange?.({
                    target: {
                        name: props.name ?? "",
                        value: valor,
                    },
                } as React.ChangeEvent<HTMLInputElement>)
            }}
            overwrite
        />
    )
}

export const InputControlado = <TFieldValues extends FieldValues>({
    name,
    label,
    control,
    errors,
    placeholder,
    mascara,
    tipo = "text",
    autoComplete,
    disabled,
}: InputControladoProps<TFieldValues>) => {
    const [senhaVisivel, setSenhaVisivel] = useState(false)
    const erro = errors[name]
    const ehSenha = tipo === "password"

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Stack>
                    <Typography sx={styles.rotulo}>
                        {label}
                    </Typography>

                    <TextField
                        {...field}
                        type={ehSenha ? (senhaVisivel ? "text" : "password") : tipo}
                        size="small"
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        disabled={disabled}
                        error={Boolean(erro)}
                        helperText={erro?.message as string | undefined}
                        sx={styles.campo}
                        slotProps={{
                            input: {
                                ...(mascara
                                    ? { inputComponent: AdaptadorMascara, inputProps: { mascara } }
                                    : {}),
                                ...(ehSenha
                                    ? {
                                          endAdornment: (
                                              <InputAdornment position="end">
                                                  <IconButton
                                                      onClick={() => setSenhaVisivel((atual) => !atual)}
                                                      edge="end"
                                                      size="small"
                                                      aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                                                  >
                                                      {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                                                  </IconButton>
                                              </InputAdornment>
                                          ),
                                      }
                                    : {}),
                            },
                        }}
                    />
                </Stack>
            )}
        />
    )
}
