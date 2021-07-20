import { Irole } from "./role";

export interface Iuser {
    blocked: boolean
    confirmed: boolean
    created_at: string | Date
    email: string
    id: number
    provider: string
    updated_at: string | Date
    username: string
    role: Irole
}