import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './notifications.styles';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const notifications = [
    { id: '1', text: "Włącz powiadomienia żeby nie przegapić ofert", time: "przed chwilą" },
    { id: '2', text: "Odkryj najlepsze hotele w swojej okolicy", time: "przed chwilą" },
    { id: '3', text: "Witaj w Vacante! Uzupełnij swój profil", time: "5 minut temu" },
    { id: '4', text: "Zalogowano pomyślnie na nowe urządzenie", time: "5 minut temu" },
  ];

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.title}>Powiadomienia</Text>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications" size={30} color="black" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {notifications.map((item) => (
            <View key={item.id} style={styles.notificationCard}>
              <View style={styles.cardMainRow}>
                <Text style={styles.bellIcon}>🔔</Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}