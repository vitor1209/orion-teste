import { useQuery } from "@tanstack/react-query"
import { faker } from "@faker-js/faker"
import luva from "@/assets/images/luva.png"
import { type ObterProduto, LojaQueryKeys } from "../models/Loja.types"

const gerarProdutoMock = (): ObterProduto.Response => {
    faker.seed(7)

    return {
        id: 1,
        nome: "Luva ORION",
        descricao:
            "A Luva ORION é uma luva tecnológica inteligente que se conecta à plataforma ORION para proporcionar uma experiência inovadora de aprendizagem musical. Com ela, você pode realizar atividades interativas, acompanhar sua evolução e desenvolver habilidades como coordenação motora, percepção musical e raciocínio de forma prática, acessível e envolvente.",
        precoReais: Number(faker.commerce.price({ min: 89, max: 129, dec: 2 })),
        imagens: [luva, luva, luva],
        materiais: faker.helpers.multiple(() => faker.color.human(), { count: 3 }),
    }
}

export const useObterProduto = () => {
    return useQuery({
        queryKey: [LojaQueryKeys.ObterProduto],
        queryFn: async (): Promise<ObterProduto.Response> => {
            await new Promise((resolve) => setTimeout(resolve, 400))
            return gerarProdutoMock()
        },
    })
}