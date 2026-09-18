import type { CampoFormularioPedido } from "./FinalizarPedido.types"

export const CAMPOS_CADASTRO: CampoFormularioPedido[] = [
    {
        name: "nomeCompleto",
        label: "Nome completo",
        placeholder: "Digite seu nome completo",
    },
    {
        name: "cpf",
        label: "CPF",
        placeholder: "000.000.000-00",
        mascara: "000.000.000-00",
    },
]

export const CAMPOS_ENDERECO: CampoFormularioPedido[] = [
    {
        name: "cep",
        label: "CEP",
        placeholder: "00000-000",
        mascara: "00000-000",
    },
    {
        name: "endereco",
        label: "Endereço",
        placeholder: "Rua, avenida ou travessa",
    },
    {
        name: "numero",
        label: "Número",
        placeholder: "123",
    },
    {
        name: "bairro",
        label: "Bairro",
        placeholder: "Seu bairro",
    },
    {
        name: "cidade",
        label: "Cidade",
        placeholder: "Sua cidade",
    },
    {
        name: "estado",
        label: "Estado",
        placeholder: "SP",
        mascara: "aa",
    },
]
