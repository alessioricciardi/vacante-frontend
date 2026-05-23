import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './hotel-details.styles';
import api from './profile/services/api';

export default function HotelDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const toISODate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const correctedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return correctedDate.toISOString().split('T')[0];
  };

  const calculateTotalPrice = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays > 0 ? diffDays : 1;
    return days * (hotel?.pricePerNight || 0);
  };

  const handleReserve = async () => {
    if (endDate <= startDate) {
      alert("Data końca musi być po dacie startu.");
      return;
    }

    setReserving(true);
    try {
      const payload = {
        hotelId: id,
        price: calculateTotalPrice(),
        startDate: toISODate(startDate),
        endDate: toISODate(endDate)
      };

      const response = await api.post('/api/reservations', payload);

      if (response.status === 201 || response.status === 200) {
        if (Platform.OS === 'web') {
          window.alert("Zarezerwowano hotel!");
        } else {
          Alert.alert("Sukces", "Zarezerwowano hotel!");
        }
        router.push('/profile' as any);

      }
    } catch (error: any) {
      alert("Błąd rezerwacji.");
    } finally {
      setReserving(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#BD00FF" style={{ flex: 1 }} />;
  if (!hotel) return null;

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <Ionicons name="heart-outline" size={30} color="#FF4B4B" />
            <Ionicons name="notifications-outline" size={30} color="black" />
          </View>
        </View>

        <Image
          source={{
            uri: (hotel.images && hotel.images[0] && !hotel.images[0].includes('example.com'))
              ? hotel.images[0]
              : `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&sig=${hotel.id}`
          }}
          style={styles.mainImage}
        />

        <View style={styles.infoRow}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <Text style={styles.hotelPrice}>{hotel.pricePerNight} zł/noc</Text>
        </View>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => <FontAwesome key={s} name="star" size={20} color="#FFD700" style={{ marginRight: 3 }} />)}
        </View>

        <View style={styles.amenitiesRow}>
          <Ionicons name="wifi" size={35} color="#BD00FF" />
          <MaterialCommunityIcons name="alpha-p-circle" size={35} color="#BD00FF" />
          <Ionicons name="water" size={35} color="#BD00FF" />
          <MaterialCommunityIcons name="spa" size={35} color="#BD00FF" />
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10, marginLeft: 10 }}>Start pobytu</Text>
        <View style={styles.dateInput}>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={toISODate(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', color: 'black' } as any}
            />
          ) : (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowPicker('start')}>
              <Text style={{ fontSize: 16 }}>{startDate.toLocaleDateString('pl-PL')}</Text>
            </TouchableOpacity>
          )}
          <Ionicons name="calendar-outline" size={20} color="#BD00FF" />
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10, marginTop: 15, marginLeft: 10 }}>Koniec pobytu</Text>
        <View style={styles.dateInput}>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={toISODate(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', color: 'black' } as any}
            />
          ) : (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowPicker('end')}>
              <Text style={{ fontSize: 16 }}>{endDate.toLocaleDateString('pl-PL')}</Text>
            </TouchableOpacity>
          )}
          <Ionicons name="calendar-outline" size={20} color="#BD00FF" />
        </View>

        {showPicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={showPicker === 'start' ? startDate : endDate}
            mode="date"
            onChange={(e, d) => {
              setShowPicker(null);
              if (d) {
                if (showPicker === 'start') setStartDate(d);
                else setEndDate(d);
              }
            }}
          />
        )}

        <View style={{ alignItems: 'center', marginVertical: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Suma: <Text style={{ color: '#BD00FF' }}>{calculateTotalPrice()} zł</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.reserveButton, reserving && { opacity: 0.6 }]}
          onPress={handleReserve}
          disabled={reserving}
        >
          {reserving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.reserveButtonText}>Zarezerwuj hotel!</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}