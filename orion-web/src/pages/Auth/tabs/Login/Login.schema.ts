import { z } from "zod"
import { emailSchema, senhaSchema } from "@/utils/validacoes"

export const loginSchema = z.object({
    email: emailSchema,
    senha: senhaSchema,
})
