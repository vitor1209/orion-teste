import { useQuery } from "@tanstack/react-query"
import { faker } from "@faker-js/faker"
import { PerfilQueryKeys, type ObterPerfil } from "../models/Perfil.types"

export const useObterPerfil = () => {
    return useQuery({
        queryKey: [PerfilQueryKeys.ObterPerfil],
        queryFn: async (): Promise<ObterPerfil.Response> => {
            await new Promise((resolve) => setTimeout(resolve, 400))
            faker.seed(58)

            return {
                id: faker.number.int({ min: 1, max: 100000 }).toString(),
                usuario: `~${faker.internet.username()}`,
                nome: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
            }
        },
    })
}
