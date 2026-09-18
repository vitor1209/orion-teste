import { useFinalizarAtividade } from "@/api/Controllers/Atividade"
import { useAuth } from "@/hooks/auth/auth.hook"
import { useObterRegistroAtividades } from "@/api/Controllers/selecaoAtividade"
import type { AtividadeConcluidaProps } from "./AtividadeConcluida"

export const useAtividadeConcluida = ({ atividadeId }: AtividadeConcluidaProps) => {
    const { usuario } = useAuth()

    const { data: registros } = useObterRegistroAtividades({
        usuarioId: usuario?.userId ?? 0,
    })

    const { mutate: finalizarAtividade } = useFinalizarAtividade()

    const atividadeJaFinalizada = registros?.some((registro) => registro.atividadeId === atividadeId) ?? false

    const onSubmit = () => {
        if (!usuario?.userId || !atividadeId) return
        if (atividadeJaFinalizada) return

        finalizarAtividade({ atividadeId, usuarioId: usuario.userId })
    }

    return { onSubmit }
}
