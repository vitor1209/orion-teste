import { useLocation, useParams } from "react-router"
import { useObterAtividades } from "@/api/Controllers/selecaoAtividade"
import { montarRotaSelecaoAtividade, REGISTRO_ATIVIDADES } from "./Atividade.utils"

export const useAtividade = () => {
    const { chave = "" } = useParams()
    const location = useLocation()

    const { data: atividades = [], isLoading } = useObterAtividades()

    const atividade = atividades.find((item) => item.chave === chave)
    const ComponenteAtividade = REGISTRO_ATIVIDADES[chave]
    const rotaVoltar = montarRotaSelecaoAtividade(location.search)

    return { atividade, ComponenteAtividade, isLoading, rotaVoltar }
}
