import { z } from "zod"
import { emailSchema, nomeUsuarioSchema, senhaCadastroSchema } from "@/utils/validacoes"

export const cadastroSchema = z.object({
    nome: nomeUsuarioSchema,
    email: emailSchema,
    senha: senhaCadastroSchema,
})
