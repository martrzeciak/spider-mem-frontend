export interface LoginResponse {
    email: string
    token: string
    userName: string
}

export interface RegisterResponse {
    id: string
    email: string
    userName: string
    createdAt: string
}

export interface User {
    email: string
    userName: string
}
