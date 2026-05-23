import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from './profile/services/api';
import { styles } from './search-results.styles';

interface Hotel {
  id: string;
  name: string;
  pricePerNight: number;
  address: string;
  city: string;
  country: string;
  images: string[];
}

export default function SearchResultsScreen() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllHotels = async () => {
      try {
        const response = await api.get('/api/hotels');
        setHotels(response.data);
      } catch (error: any) {
        Alert.alert("Błąd", "Nie udało się pobrać hoteli.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllHotels();
  }, []);

  const getImageUrl = (hotel: Hotel) => {
    const imageName = hotel.images && hotel.images[0];
    
    if (!imageName) {
      return `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&sig=${hotel.id}`;
    }

    if (imageName.startsWith('http')) {
      return imageName;
    }

    return `https://vacantestorage.blob.core.windows.net/vacante/${imageName}`;
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>
          <View style={styles.headerTitleSection}>
            <Text style={styles.headerTitle}>Sopot, Polska</Text>
            <Text style={styles.headerSubtitle}>01.05-05.05</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          <TouchableOpacity style={[styles.chip, styles.chipActive]}><Text style={[styles.chipText, styles.chipTextActive]}>Lokalizacja</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Cena</Text></TouchableOpacity>
          <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Opinie</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.chip, styles.chipMap]}><Text style={[styles.chipText, styles.chipTextActive]}>Pokaż mapę</Text></TouchableOpacity>
        </ScrollView>

        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator color="#BD00FF" size="large" style={{ marginTop: 50 }} />
          ) : (
            hotels.map((hotel) => (
              <TouchableOpacity 
                key={hotel.id} 
                style={styles.hotelCard}
                activeOpacity={0.9}
                onPress={() => router.push({ pathname: '/hotel-details', params: { id: hotel.id } } as any)}
              >
                <Image source={{ uri: getImageUrl(hotel) }} style={styles.hotelImage} />
                <View style={styles.hotelHeader}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <Text style={styles.hotelPrice}>{hotel.pricePerNight} zł/noc</Text>
                </View>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FontAwesome key={s} name="star" size={18} color="#FFD700" style={{ marginRight: 2 }} />
                  ))}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}