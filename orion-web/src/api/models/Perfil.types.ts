export enum PerfilQueryKeys {
    ObterPerfil = "obterPerfil",
}

export type Perfil = {
    id: string
    usuario: string
    nome: string
    email: string
    avatar?: string
}

export namespace ObterPerfil {
    export type Response = Perfil
}
