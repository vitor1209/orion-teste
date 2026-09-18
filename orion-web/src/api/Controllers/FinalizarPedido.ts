import { useMutation, useQuery } from "@tanstack/react-query"
import { faker } from "@faker-js/faker"
import luva from "@/assets/images/luva.png"
import { type EnviarPedido, FinalizarPedidoQueryKeys, type ObterProdutoPedido } from "../models/FinalizarPedido.types"

const gerarResumoPedidoMock = (): ObterProdutoPedido.Response => {
    faker.seed(11)

    return {
        produto: {
            id: 1,
            nome: "Luva ORION",
            imagem: luva,
            precoUnitario: Number(faker.commerce.price({ min: 35, max: 45, dec: 2 })),
        },
        frete: Number(faker.commerce.price({ min: 0, max: 15, dec: 2 })),
        desconto: 0,
    }
}

export const useObterProdutoPedido = () => {
    return useQuery({
        queryKey: [FinalizarPedidoQueryKeys.ObterProdutoPedido],
        queryFn: async (): Promise<ObterProdutoPedido.Response> => {
            await new Promise((resolve) => setTimeout(resolve, 400))
            return gerarResumoPedidoMock()
        },
    })
}

export const useEnviarPedido = () => {
    return useMutation<EnviarPedido.Response, Error, EnviarPedido.Request>({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 650))
            faker.seed(23)

            return { numeroPedido: faker.string.numeric(8) }
        },
    })
}