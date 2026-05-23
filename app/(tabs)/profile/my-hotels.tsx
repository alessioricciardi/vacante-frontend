import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import api from './services/api'; 
import { styles } from './my-hotels.styles';

interface Hotel {
  id: string;
  name: string;
  city: string;
  images: string[];
}

export default function MyHotelsScreen() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyHotels();
  }, []);

  const fetchMyHotels = async () => {
    try {
      const response = await api.get('/api/hotels');
      setHotels(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteHotel = async (id: string) => {
    try {
      const response = await api.delete(`/api/hotels/${id}`);
      if (response.status === 200 || response.status === 204) {
        setHotels((prev) => prev.filter((h) => h.id !== id));
      }
    } catch (error) {
      alert("Błąd usuwania.");
    }
  };

  const confirmDelete = (id: string, name: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Usunąć ${name}?`)) deleteHotel(id);
    } else {
      Alert.alert("Usuwanie", `Usunąć ${name}?`, [
        { text: "Anuluj", style: "cancel" },
        { text: "Usuń", style: "destructive", onPress: () => deleteHotel(id) }
      ]);
    }
  };

  const getImageUrl = (hotel: Hotel) => {
    const imageName = hotel.images && hotel.images[0];
    if (!imageName) return `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600`;
    if (imageName.startsWith('http')) return imageName;
    return `https://vacantestorage.blob.core.windows.net/vacante/${imageName}`;
  };

  if (loading) return <ActivityIndicator size="large" color="#BD00FF" style={{ flex: 1 }} />;

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>
          <Text style={styles.title}>Moje hotele</Text>
          <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {hotels.map((hotel) => (
            <View key={hotel.id} style={styles.hotelCardContainer}>
              <ImageBackground 
                source={{ uri: getImageUrl(hotel) }} 
                style={styles.hotelImage}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <Text style={styles.hotelLocation}>{hotel.city}, Polska</Text>
                </View>
              </ImageBackground>

              <View style={styles.actionsRow}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => router.push({ pathname: '/profile/edit-hotel', params: { id: hotel.id } } as any)}
                >
                  <Ionicons name="pencil" size={16} color="#BD00FF" />
                  <Text style={styles.editButtonText}>Edytuj</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteCircle} onPress={() => confirmDelete(hotel.id, hotel.name)}>
                  <Ionicons name="trash-outline" size={20} color="#BD00FF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}