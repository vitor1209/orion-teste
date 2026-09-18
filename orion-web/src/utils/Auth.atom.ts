import type { Usuario } from "@/api/models/Auth.types"
import { atomWithStorage } from "jotai/utils"

export interface AuthState {
    usuario: Usuario | null
    access_token: string | null
    token_type: string | null
}

export const authAtom = atomWithStorage<AuthState>(
    "auth",
    {
        usuario: null,
        access_token: null,
        token_type: null,
    }
)