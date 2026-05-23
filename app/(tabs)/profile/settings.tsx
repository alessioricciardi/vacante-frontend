import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './settings.styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  const settingsItems = [
    "Powiadomienia PUSH",
    "Język",
    "Waluta",
    "Zmień hasło",
    "Polityka Prywatności"
  ];

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>

          <Text style={styles.title}>Ustawienia</Text>

          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuButton} activeOpacity={0.7}>
              <Text style={styles.menuButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}