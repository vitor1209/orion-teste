import { queryClient } from "@/api/QueryClient"

export const invalidarQueries = (queryKey: unknown[]) => {
    return queryClient.invalidateQueries({ queryKey })
}
