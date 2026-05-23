import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './(tabs)/profile/settings.styles';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
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
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ustawienia</Text>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={30} color="black" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Lista opcji */}
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