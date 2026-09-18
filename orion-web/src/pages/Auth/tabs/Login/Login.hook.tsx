import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useEntrar } from "@/api/Controllers/Auth"
import { loginSchema } from "./Login.schema"
import type { LoginSchema } from "./Login.types"

export const useLogin = () => {
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            senha: "",
        },
    })

    const { mutateAsync: entrar } = useEntrar()

    const enviarLogin = async (dados: LoginSchema) => {
        await entrar(dados)
        navigate("/")
    }

    return { control, errors, isSubmitting, handleSubmit, enviarLogin }
}
