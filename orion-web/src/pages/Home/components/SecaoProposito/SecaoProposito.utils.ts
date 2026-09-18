import notasMusicais from "@/assets/images/notas.png"
import neuronio from "@/assets/images/neuronio.png"
import pianista from "@/assets/images/nuvem.png"
import type { Funcionalidade } from "./SecaoProposito.types"

export const FUNCIONALIDADES: Funcionalidade[] = [
    {
        id: 1,
        titulo: "Aprendizado acessível",
        descricao:
            "Democratizamos o acesso à educação musical, permitindo que qualquer pessoa explore instrumentos sem barreiras financeiras ou físicas.",
        imagem: notasMusicais,
        textoAlternativoImagem: "Notas musicais",
        inverter: false,
    },
    {
        id: 2,
        titulo: "Melhorar a cognição",
        descricao:
            "A prática musical estimula áreas cerebrais ligadas à memória, atenção e criatividade, promovendo um desenvolvimento cognitivo completo.",
        imagem: neuronio,
        textoAlternativoImagem: "Neurônio",
        inverter: true,
    },
    {
        id: 3,
        titulo: "Desenvolvimento motor",
        descricao:
            "Os movimentos precisos dos dedos fortalecem a coordenação motora fina e a conexão entre mãos e mente.",
        imagem: pianista,
        textoAlternativoImagem: "Pianista",
        inverter: false,
    },
]