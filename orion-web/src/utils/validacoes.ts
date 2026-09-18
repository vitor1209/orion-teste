import { z } from "zod"

const deixarApenasNumeros = (valor: string) => valor.replace(/\D/g, "")

export const cpfValido = (valor: string) => {
    const cpf = deixarApenasNumeros(valor)

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false
    }

    const calcularDigito = (slice: string, fatorInicial: number) => {
        const total = slice
            .split("")
            .reduce((acumulado, digito, indice) => acumulado + Number(digito) * (fatorInicial - indice), 0)
        const resto = (total * 10) % 11

        return resto === 10 ? 0 : resto
    }

    const primeiroDigito = calcularDigito(cpf.slice(0, 9), 10)
    const segundoDigito = calcularDigito(cpf.slice(0, 10), 11)

    return primeiroDigito === Number(cpf[9]) && segundoDigito === Number(cpf[10])
}

export const nomeCompletoSchema = z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .refine((valor) => valor.split(/\s+/).length >= 2, {
        message: "Digite nome e sobrenome",
    })

export const cpfSchema = z
    .string()
    .trim()
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "Informe um CPF válido")
    .refine((valor) => cpfValido(valor), "Informe um CPF válido")

export const cepSchema = z.string().trim().regex(/^\d{5}-?\d{3}$/, "Informe um CEP válido")

export const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Informe um email válido")

export const senhaSchema = z.string().nonempty("Digite sua senha para continuar.")

export const senhaCadastroSchema = z.string().min(6, "Use pelo menos 6 caracteres.")

export const nomeUsuarioSchema = z.string().trim().min(3, "Digite pelo menos 3 caracteres.")

export const finalizarPedidoSchema = z.object({
    nomeCompleto: nomeCompletoSchema,
    cpf: cpfSchema,
    cep: cepSchema,
    endereco: z.string().trim().min(3, "Informe o endereço"),
    numero: z.string().trim().nonempty("Informe o número"),
    bairro: z.string().trim().min(2, "Informe o bairro"),
    cidade: z.string().trim().min(2, "Informe a cidade"),
    estado: z.string().trim().length(2, "Use a sigla do estado"),
    metodoPagamento: z.literal("pix", {
        message: "Selecione um método de pagamento",
    }),
})

export const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor)