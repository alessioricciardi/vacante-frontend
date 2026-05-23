import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: 'http://20.215.33.70/',
});

api.interceptors.request.use(async (config) => {
  let token = null;

  if (Platform.OS === 'web') {
    token = localStorage.getItem('userToken');
  } else {
    token = await SecureStore.getItemAsync('userToken');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;