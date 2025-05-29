import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useContext } from 'react'
import AuthContext from './contexts/AuthContext'
import { normalizeCpfNumber } from './utils/functions'

export default function CadastroScreen () {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCPF] = useState('')

  const { register } = useContext(AuthContext)

  const handlePassword = (text: string) => {
    setPassword(text)
  }

  const handleName = (text: string) => {
    setName(text)
  }

  const handleEmail = (text: string) => {
    setEmail(text)
  }

  const handleCPF = (text: string) => {
    setCPF(normalizeCpfNumber(text))
  }

  const [registerErrorMsg, setRegisterErrorMsg] = useState<string | undefined>(
    undefined
  )

  const handleSubmit = () => {
    const registerData = {
      name,
      email,
      password,
      cpf,
      setErrorMsg: setRegisterErrorMsg
    }

    register(registerData)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.returnText} onPress={() => router.back()}>
          Voltar
        </Text>

        <Text style={styles.title}>Cadastre-se</Text>

        <Text style={styles.label}>Seu nome</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleName}
          placeholder='Arthur Marques'
          placeholderTextColor='#aaa'
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={handleCPF}
          placeholder='000.000.000-00'
          keyboardType='numeric'
          placeholderTextColor='#aaa'
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmail}
          placeholder='arthur@cs.cesuca.edu.br'
          placeholderTextColor='#aaa'
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePassword}
          placeholder='************'
          secureTextEntry
          placeholderTextColor='#aaa'
        />

        {registerErrorMsg && (
          <Text style={{ color: 'red' }}>{registerErrorMsg}</Text>
        )}

        <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
          <Text style={styles.registerText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe7e2',
    padding: 24,
    paddingTop: 80
  },
  returnText: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 50
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  input: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16
  },
  forgot: {
    color: '#2e5748',
    marginBottom: 32
  },
  registerBtn: {
    backgroundColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16
  },
  registerText: {
    color: '#fff',
    fontSize: 16
  }
})
