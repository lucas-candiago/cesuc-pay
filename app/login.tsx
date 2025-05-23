import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useRouter } from 'expo-router'

export default function LoginScreen () {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.returnText} onPress={() => router.back()}>
        Voltar
      </Text>

      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder='000.000.000-00'
        keyboardType='numeric'
        placeholderTextColor='#aaa'
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder='************'
        secureTextEntry
        placeholderTextColor='#aaa'
      />

      <TouchableOpacity onPress={() => router.push('/recuperar-senha')}>
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/home')}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.registerText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
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
