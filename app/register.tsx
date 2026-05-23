import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from './(tabs)/profile/services/api';
import { styles } from './register.styles';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Hasła nie są takie same!");
      return;
    }

    try {
      await api.post('/register', {
        email: email,
        password: password
      });

      alert("Zarejestrowano!");
      router.push('/login');
    } catch (error: any) {
      alert("Błąd: " + (error.response?.data || "Błąd połączenia"));
    }
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ width: '100%' }}>
          <Text style={styles.logoText}>Vacante</Text>
          <Text style={styles.title}>Zarejestruj się!</Text>

          <View style={styles.inputContainer}>
            <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput placeholder="Hasło" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
            <TextInput placeholder="Powtórz hasło" secureTextEntry style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Zarejestruj się!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLinkBold}>Zaloguj się!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}