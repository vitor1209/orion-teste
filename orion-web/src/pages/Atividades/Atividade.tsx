import { Suspense } from "react"
import { useAtividade } from "./Atividade.hook"
import { AvisoAtividade } from "./components/AvisoAtividade/AvisoAtividade"

export const Atividade = () => {
    const { atividade, ComponenteAtividade, isLoading, rotaVoltar } = useAtividade()

    if (isLoading) return <AvisoAtividade estado="carregando" rotaVoltar={rotaVoltar} />

    if (!atividade || !ComponenteAtividade)
        return <AvisoAtividade estado="indisponivel" rotaVoltar={rotaVoltar} />

    return (
        <Suspense fallback={<AvisoAtividade estado="carregando" rotaVoltar={rotaVoltar} />}>
            <ComponenteAtividade atividade={atividade} rotaVoltar={rotaVoltar} />
        </Suspense>
    )
}
