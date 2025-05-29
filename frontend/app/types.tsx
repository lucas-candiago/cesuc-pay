// File for storing types
import { ReactNode } from "react"

export interface LoginData {
    cpf: string
    password: string
    setErrorMsg: (msg: string | undefined) => void
}

export interface RegisterData {
    name: string
    email: string
    cpf: string
    password: string
    setErrorMsg: (msg: string | undefined) => void
}

export interface ChangeData {
    oldPassword: string
    newPassword: string
    setErrorMsg: (msg: string | undefined) => void
}


export interface AuthContextData {
    login: (data: LoginData) => Promise<void>
    logout: () => void
    change: (data: ChangeData) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    fetchTransactions: () => Promise<void>
    transactions: Transaction[]
    total: number
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface Transaction {
    id: string
    description: string
    type: string
    date: string
    price: number
    category: string
}