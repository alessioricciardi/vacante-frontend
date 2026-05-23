import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './profile.styles';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { title: "Moje rezerwacje", route: "/profile/reservations" },
    { title: "Edytuj dane", route: null },
    { title: "Dodaj hotel", route: "/profile/add-hotel" },
    { title: "Ustawienia", route: "/profile/settings" },
    { title: "Moje hotele", route: "/profile/my-hotels" }
  ];

  const handleLogout = async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem('userToken');
      } else {
        await SecureStore.deleteItemAsync('userToken');
      }

      router.replace('/login'); 
    } catch (error) {
      console.error(error);
    }
  };

  const confirmLogout = () => {
    if (Platform.OS === 'web') {
      if (window.confirm("Czy na pewno chcesz się wylogować?")) {
        handleLogout();
      }
    } else {
      Alert.alert(
        "Wylogowanie",
        "Czy na pewno chcesz się wylogować?",
        [
          { text: "Anuluj", style: "cancel" },
          { text: "Wyloguj", onPress: handleLogout, style: "destructive" }
        ]
      );
    }
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mój profil</Text>
          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Ionicons name="person-circle-outline" size={60} color="#5D9CEC" />
          <Text style={styles.userName}>Jan Kowalski</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuButton} 
              onPress={() => item.route && router.push(item.route as any)}
            >
              <Text style={styles.menuButtonText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={confirmLogout}
        >
          <Text style={styles.logoutButtonText}>Wyloguj się!</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}