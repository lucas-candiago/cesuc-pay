import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { AuthProvider } from './contexts/AuthContext'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='home' options={{ headerShown: false }} />
        <Stack.Screen name='login' options={{ headerShown: false }} />
        <Stack.Screen name='cadastro' options={{ headerShown: false }} />
        <Stack.Screen name='recuperar-senha' options={{ headerShown: false }} />
        <Stack.Screen
          name='adicionar-registro'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='editar-registro'
          options={{ headerShown: false }}
        />
        <Stack.Screen name='ver-tudo' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}
