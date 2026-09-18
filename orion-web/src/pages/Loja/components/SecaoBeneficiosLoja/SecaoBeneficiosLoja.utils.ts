import { ShieldCheck, Sparkles, Zap } from "lucide-react"
import type { BeneficioLoja } from "./SecaoBeneficiosLoja.types"

export const BENEFICIOS_LOJA: BeneficioLoja[] = [
    {
        icon: Sparkles,
        titulo: "Aprendizado interativo",
        descricao:
            "Transforme gestos em respostas visuais e avance nas atividades de forma mais envolvente.",
    },
    {
        icon: Zap,
        titulo: "Pronta para praticar",
        descricao:
            "Use a luva nas trilhas guiadas da Orion e acompanhe seu progresso com mais clareza.",
    },
    {
        icon: ShieldCheck,
        titulo: "Compra segura",
        descricao:
            "Finalize o pedido em poucos passos, com pagamento via PIX e acompanhamento pelo perfil.",
    },
]