import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  View
} from 'react-native'
import { useRouter } from 'expo-router'
import AuthContext from './contexts/AuthContext'
import { useContext, useState } from 'react'
import { normalizeCpfNumber } from './utils/functions'
import { Feather } from '@expo/vector-icons'

export default function LoginScreen () {
  const router = useRouter()

  const [cpf, setCPF] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const handleCPF = (text: string) => {
    setCPF(normalizeCpfNumber(text))
  }

  const handlePassword = (text: string) => {
    setPassword(text)
  }

  const [loginErrorMsg, setLoginErrorMsg] = useState<string | undefined>(
    undefined
  )

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    const loginData = {
      cpf,
      password,
      setErrorMsg: setLoginErrorMsg
    }
    setLoginErrorMsg(undefined)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login(loginData)
    }, 1500)
    return
    login(loginData)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Text style={styles.returnText} onPress={() => router.back()}>
          Voltar
        </Text>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={handleCPF}
          placeholder='000.000.000-00'
          keyboardType='numeric'
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
        <TouchableOpacity onPress={() => router.push('/recuperar-senha')}>
          <Text style={styles.forgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        {loginErrorMsg && <Text style={{ color: 'red' }}>{loginErrorMsg}</Text>}
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          {isLoading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather
                name='loader'
                size={16}
                color='#fff'
                style={{ marginRight: 5 }}
              />
              <Text style={styles.loadingText}>
                Carregando...
              </Text>
            </View>
          ) : (
            <Text style={styles.loginText}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.registerText}>Cadastrar-se</Text>
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
  loginBtn: {
    backgroundColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16
  },
  loginText: {
    color: '#fff',
    fontSize: 16
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 2
  },
  registerBtn: {
    borderWidth: 1,
    borderColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  registerText: {
    color: '#2e5748',
    fontSize: 16
  }
})
