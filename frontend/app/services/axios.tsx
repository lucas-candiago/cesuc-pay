import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { API_URL } = Constants.expoConfig?.extra as { API_URL: string };

const axiosAPI = axios.create({
  baseURL: API_URL,
});

// Adicionando um interceptor para requisições
axiosAPI.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAPI;
