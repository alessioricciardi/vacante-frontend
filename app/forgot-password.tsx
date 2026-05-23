import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './forgot-password.styles';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        <Text style={styles.logoText}>Vacante</Text>

        <Text style={styles.title}>Zapomniałeś hasła?</Text>
        <Text style={styles.subtitle}>
          Podaj swój e-mail, a wyślemy Ci link do resetowania hasła
        </Text>

        <TextInput 
          placeholder="E-mail" 
          style={styles.input} 
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Wyślij link</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerLink} 
          onPress={() => router.back()}
        >
          <Text style={styles.footerLinkText}>Wróć do logowania</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
}