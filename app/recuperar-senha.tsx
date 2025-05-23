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

      <Text style={styles.title}>Recuperar senha</Text>
      <Text style={styles.text}>
        Enviaremos um e-mail com instruções de como redefinir sua senha.
      </Text>

      <Text style={styles.label}>E-mail de recuperação:</Text>
      <TextInput
        style={styles.input}
        placeholder='arthur@cs.cesuca.edu.br'
        placeholderTextColor='#aaa'
      />

      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.sendText}>Enviar email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => router.back()}
      >
        <Text style={styles.returnText}>Voltar</Text>
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginBottom: 50
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
  sendBtn: {
    backgroundColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 50,
  },
  sendText: {
    color: '#fff',
    fontSize: 16
  },
  returnBtn: {
    borderWidth: 1,
    borderColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  returnText: {
    color: '#2e5748',
    textAlign: 'right',
    fontSize: 16
  }
})
