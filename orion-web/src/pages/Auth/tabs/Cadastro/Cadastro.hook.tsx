import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { useNavigate } from "react-router"
import { useCadastrar } from "@/api/Controllers/Auth"
import { cadastroSchema } from "./Cadastro.schema"
import type { CadastroSchema, ForcaSenha } from "./Cadastro.types"

export const useCadastro = () => {
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CadastroSchema>({
        resolver: zodResolver(cadastroSchema),
        mode: "onChange",
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
        },
    })

    const { mutateAsync: cadastrar } = useCadastrar()

    const senha = useWatch({ control, name: "senha" })

    const calcularForcaSenha = (senha: string): ForcaSenha => {
        const temNumero = /\d/.test(senha)
        const temEspecial = /[^A-Za-z0-9]/.test(senha)

        if (senha.length >= 10 && temNumero && temEspecial) {
            return "forte"
        }

        if (senha.length >= 6 && (temNumero || temEspecial)) {
            return "media"
        }

        return "fraca"
    }

    const forcaSenha = calcularForcaSenha(senha)

    const enviarCadastro = async (dados: CadastroSchema) => {
        await cadastrar(dados)
        navigate("/login")
    }

    return { control, errors, isSubmitting, handleSubmit, enviarCadastro, senha, forcaSenha }
}
