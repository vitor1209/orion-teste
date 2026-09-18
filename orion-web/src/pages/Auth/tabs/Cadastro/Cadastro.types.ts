import type z from "zod"
import type { cadastroSchema } from "./Cadastro.schema"

export type CadastroSchema = z.infer<typeof cadastroSchema>

export type ForcaSenha = "fraca" | "media" | "forte"
