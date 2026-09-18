import type { Control, FieldErrors, FieldPath, FieldValues } from "react-hook-form"

export type TipoInputControlado = "text" | "email" | "password" | "tel"

export type InputControladoProps<TFieldValues extends FieldValues> = {
    name: FieldPath<TFieldValues>
    label: string
    control: Control<TFieldValues>
    errors: FieldErrors<TFieldValues>
    placeholder?: string
    mascara?: string
    tipo?: TipoInputControlado
    autoComplete?: string
    disabled?: boolean
}
