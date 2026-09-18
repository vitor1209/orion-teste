export type Usuario = {
    userId: number
    nome: string
    email: string
}

export namespace Entrar {
    export type Request = {
        email: string
        senha: string
    }

    export type Response = {
        accessToken: string
        tokenType: string
        userId: number
        nome: string
        email: string
    }
}

export namespace Cadastrar {
    export type Request = {
        nome: string
        email: string
        senha: string
    }

    export type Response = {
        usuario: Usuario
    }
}
