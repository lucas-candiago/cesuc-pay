import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useRouter } from 'expo-router'

export default function CadastroScreen () {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.returnText} onPress={() => router.back()}>
        Voltar
      </Text>

      <Text style={styles.title}>Cadastre-se</Text>

      <Text style={styles.label}>Seu nome</Text>
      <TextInput
        style={styles.input}
        placeholder='Arthur Marques'
        placeholderTextColor='#aaa'
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder='000.000.000-00'
        keyboardType='numeric'
        placeholderTextColor='#aaa'
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder='arthur@cs.cesuca.edu.br'
        placeholderTextColor='#aaa'
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder='************'
        secureTextEntry
        placeholderTextColor='#aaa'
      />

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.registerText}>Cadastrar</Text>
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
  },
})
