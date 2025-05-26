import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('@/assets/images/card.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.loginContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.description}>
          Mais planejamento, menos preocupações: Organize seus gastos e foque no que realmente importa.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')} 
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaffea',
    minHeight: height,
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    marginTop: 1
  },
  logo: {
    width: '100%'
  },
  description: {
    textAlign: 'center',
    fontSize: 22,
    color: '#333',
    padding: 10,
  },
  button: {
    backgroundColor: '#4a7c59',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
    width: '80%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    gap: 20,
    paddingBottom: 50
  },
});
