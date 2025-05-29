import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import axiosAPI from '../services/axios'
import { LoginData, RegisterData, ChangeData, AuthContextData, Transaction } from '../types'

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const login = async ({ cpf, password, setErrorMsg }: LoginData) => {
    try {
      const res = await axiosAPI.post('users/login/', { cpf, password })

      const userName = res.data.user.name
      const token = res.data.token

      await AsyncStorage.setItem('auth_token', token)
      await AsyncStorage.setItem('userName', userName)

      router.push('/home')
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setErrorMsg('Incorrect email or password')
        console.log('Wrong credentials during login')
        return
      }

      console.log('Unexpected error during login', error)
      router.push('/login')
    }
  }

  const register = async ({
    name,
    email,
    password,
    cpf,
    setErrorMsg
  }: RegisterData) => {
    try {
      const res = await axiosAPI.post('users/register/', {
        name,
        email,
        password,
        cpf
      })
      if (res.status === 201) {
        await login({ cpf, password, setErrorMsg })
      }
    } catch (error) {
      console.log('Unexpected error during register', error)
      router.push('/cadastro')
    }
  }

  const change = async ({
    oldPassword,
    newPassword,
    setErrorMsg
  }: ChangeData) => {
    try {
      const res = await axiosAPI.patch('/change-password/', {
        oldPassword,
        newPassword
      })

      if (res) {
        router.push('/home')
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        if (error.response.data) {
          setErrorMsg(error.response.data['msg'])
          return
        }

        console.log('Unexpected error during password change')
        return
      }

      console.log('Critical unexpected error during password change', error)
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('auth_token')
    await AsyncStorage.removeItem('userName')
    router.push('/login')
  }

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  
  const fetchTransactions = async () => {
    axiosAPI.get("transactions/all").then(res => {
      let tot = 0
      res.data.transactions.map((transaction: Transaction) => {
        if (transaction.type == 'despesa') tot += Number(transaction.price)
      })
      setTransactions(res.data.transactions)
      setTotal(tot)
  })
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, change, register, transactions, total, fetchTransactions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
