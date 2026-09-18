import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { montarRotaAnterior, montarRotaAtividade, ordenarPorOrdem } from "./SelecaoAtividade.utils"
import { ConteudoAtividade, StatusAtividade, StatusFiltroAtividade, type Atividade } from "@/api/models/SelecaoAtividade.types"
import { useObterAtividades, useObterRegistroAtividades } from "@/api/Controllers/selecaoAtividade"
import { useAuth } from "@/hooks/auth/auth.hook"

export const useSelecaoAtividade = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { usuario } = useAuth()

    const [busca, setBusca] = useState("")
    const [statusSelecionado, setStatusSelecionado] = useState<StatusFiltroAtividade>(
        StatusFiltroAtividade.Todas
    )
    const [conteudoSelecionado, setConteudoSelecionado] = useState<ConteudoAtividade | null>(null)

    const { data: atividades = [], isLoading: isLoadingAtividades } = useObterAtividades()
    const { data: registros = [], isLoading: isLoadingRegistros } = useObterRegistroAtividades({
        usuarioId: usuario?.userId!,
    })

    const isLoading = isLoadingAtividades || isLoadingRegistros
    const params = new URLSearchParams(location.search)
    const modo = params.get("modo") ?? "guiado"
    const interacao = params.get("interacao") ?? "luva"
    const instrumento = params.get("instrumento") ?? "teclado"

    const rotaAnterior = montarRotaAnterior(modo, interacao)

    const idsAtividadesConcluidas = new Set(registros.map((registro) => registro.atividadeId))

    const atividadesComStatus = ordenarPorOrdem(atividades).map((atividade) => ({
        ...atividade,
        status: idsAtividadesConcluidas.has(atividade.id)
            ? StatusAtividade.Concluida
            : StatusAtividade.Pendente,
    }))

    const termoBusca = busca.trim().toLowerCase()

    const atividadesFiltradas = atividadesComStatus.filter((atividade) => {
        const correspondeInteracao = (() => {
            if (!atividade.tipo) return true

            const alvo = interacao.toLowerCase()
            const tipoEsperado = alvo === "camera" ? "manossolfa" : alvo
            const tipos = String(atividade.tipo).toLowerCase()

            return tipos.includes(tipoEsperado) || tipos.includes("ambos") || tipos.includes("todos")
        })()

        const correspondeBusca =
            termoBusca.length === 0 ||
            atividade.titulo.toLowerCase().includes(termoBusca) ||
            atividade.descricao.toLowerCase().includes(termoBusca) ||
            atividade.subTitulo.toLowerCase().includes(termoBusca)

        const correspondeStatus =
            statusSelecionado === StatusFiltroAtividade.Todas ||
            (statusSelecionado === StatusFiltroAtividade.Concluidas &&
                atividade.status === StatusAtividade.Concluida) ||
            (statusSelecionado === StatusFiltroAtividade.Pendentes &&
                atividade.status !== StatusAtividade.Concluida)

        const correspondeConteudo =
            conteudoSelecionado === null || atividade.categoria === conteudoSelecionado

        return correspondeBusca && correspondeStatus && correspondeConteudo && correspondeInteracao
    })

    const atividadesConcluidas = atividadesFiltradas.filter(
        (atividade) => atividade.status === StatusAtividade.Concluida
    ).length

    const alternarConteudoSelecionado = (conteudo: ConteudoAtividade) => {
        setConteudoSelecionado((atual) => (atual === conteudo ? null : conteudo))
    }

    const selecionarAtividade = (atividade: Atividade) => {
        navigate(montarRotaAtividade(atividade.chave, { modo, interacao, instrumento }))
    }

    const voltar = () => navigate(rotaAnterior)

    return {
        busca,
        setBusca,
        statusSelecionado,
        setStatusSelecionado,
        conteudoSelecionado,
        alternarConteudoSelecionado,
        atividadesFiltradas,
        atividadesConcluidas,
        totalAtividades: atividadesFiltradas.length,
        isLoading,
        selecionarAtividade,
        voltar,
    }
}
