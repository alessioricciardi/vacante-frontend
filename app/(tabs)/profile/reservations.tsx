import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, ScrollView, Text, TouchableOpacity, View, Platform } from 'react-native';
import api from './services/api';
import { styles } from './reservations.styles';

interface Hotel {
  id: string;
  name: string;
  images: string[];
  city: string;
}

interface Reservation {
  id: string;
  hotelId: string;
  startDate: string;
  endDate: string;
  price: number;
}

export default function ReservationsScreen() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [resResponse, hotelsResponse] = await Promise.all([
        api.get('/api/reservations'),
        api.get('/api/hotels')
      ]);
      setReservations(resResponse.data);
      setHotels(hotelsResponse.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id: string) => {
    try {
      await api.delete(`/api/reservations/${id}`);
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (error) {
    }
  };

  const confirmDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm("Usunąć?")) deleteReservation(id);
    } else {
      Alert.alert("Usuwanie", "Usunąć?", [
        { text: "Anuluj", style: "cancel" },
        { text: "Usuń", style: "destructive", onPress: () => deleteReservation(id) }
      ]);
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
  };

  const getImageUrl = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    const imageName = hotel?.images && hotel.images[0];
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
          <Text style={styles.title}>Moje rezerwacje</Text>
          <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {reservations.map((res) => {
            const hotelInfo = hotels.find(h => h.id === res.hotelId);
            return (
              <View key={res.id} style={styles.cardContainer}>
                <ImageBackground 
                  source={{ uri: getImageUrl(res.hotelId) }} 
                  style={styles.hotelImage}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.hotelName}>{hotelInfo ? hotelInfo.name : "Hotel"}</Text>
                    <Text style={styles.hotelLocation}>
                      {hotelInfo?.city || "Polska"}, {formatDate(res.startDate)} - {formatDate(res.endDate)}
                    </Text>
                  </View>
                </ImageBackground>

                <View style={styles.actionsRow}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => router.push({ pathname: "/profile/edit-reservation", params: { id: res.id } } as any)}
                  >
                    <Ionicons name="pencil" size={16} color="#BD00FF" />
                    <Text style={styles.editButtonText}>Edytuj</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.deleteCircle} onPress={() => confirmDelete(res.id)}>
                    <Ionicons name="trash-outline" size={20} color="#BD00FF" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}