import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './(tabs)/profile/services/api';
import { styles } from './login.styles';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Proszę wypełnić wszystkie pola.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      const token = response.data;
      console.log("Logowanie udane! Token:", token);

      if (Platform.OS === 'web') {
        localStorage.setItem('userToken', token);
      } else {
        await SecureStore.setItemAsync('userToken', token);
      }

      router.replace('/(tabs)'); 

    } catch (error: any) {
      console.error("Szczegóły błędu logowania:", error);

      if (error.response) {
        if (error.response.status === 401) {
          alert("Błąd: Błędny e-mail lub hasło.");
        } else {
          alert("Błąd serwera: " + (error.response.data || "Spróbuj ponownie."));
        }
      } else {
        alert("Błąd połączenia: Serwer nie odpowiada.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <Text style={styles.logoText}>Vacante</Text>
        <Text style={styles.title}>Zaloguj się!</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="E-mail" 
            style={styles.input}
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail} 
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput 
            placeholder="Hasło" 
            secureTextEntry 
            style={styles.input}
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword} 
          />
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>Zaloguj!</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => router.push('/forgot-password')}
        >
          <Text style={styles.forgotPasswordText}>Zapomniałeś hasła?</Text>
        </TouchableOpacity>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Zaloguj się przy użyciu:</Text>
          <View style={styles.socialButtonsRow}>
            <TouchableOpacity><Ionicons name="logo-facebook" size={50} color="#1877F2" /></TouchableOpacity>
            <TouchableOpacity><AntDesign name="google" size={50} color="#EA4335" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="logo-apple" size={50} color="#000" /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nie masz konta?</Text>
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.registerButtonText}>Zarejestruj się!</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}