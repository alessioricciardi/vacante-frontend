import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from './services/api'; 
import { styles } from './edit-hotel.styles';

export default function EditReservationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hotelPricePerNight, setHotelPricePerNight] = useState(0);
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resResponse = await api.get(`/api/reservations/${id}`);
        const resData = resResponse.data;

        const hotelResponse = await api.get(`/api/hotels/${resData.hotelId}`);
        setHotelPricePerNight(hotelResponse.data.pricePerNight);

        setPrice(resData.price.toString());
        setStartDate(new Date(resData.startDate));
        setEndDate(new Date(resData.endDate));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (!loading && hotelPricePerNight > 0) {
      calculateAndSetPrice();
    }
  }, [startDate, endDate]);

  const calculateAndSetPrice = () => {
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays > 0 ? diffDays : 1;
    setPrice((days * hotelPricePerNight).toString());
  };

  const toISODate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const correctedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return correctedDate.toISOString().split('T')[0];
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await api.put(`/api/reservations/${id}`, {
        price: parseFloat(price),
        startDate: toISODate(startDate),
        endDate: toISODate(endDate)
      });
      if (Platform.OS === 'web') window.alert("Zaktualizowano!");
      router.back();
    } catch (error) {
      alert("Błąd zapisu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#BD00FF" style={{ flex: 1 }} />;

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>
          <Text style={styles.title}>Edytuj</Text>
          <View style={{ width: 32 }} />
        </View>

        <Text style={styles.sectionLabel}>Cena całkowita (zł)</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={[styles.input, { color: '#BD00FF', fontWeight: 'bold' }]} 
            value={price} 
            editable={false}
          />
          <Ionicons name="cash-outline" size={18} color="#BD00FF" />
        </View>

        <Text style={styles.sectionLabel}>Start pobytu</Text>
        <View style={styles.inputContainer}>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={toISODate(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', color: 'black' } as any}
            />
          ) : (
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => setShowPicker('start')}>
              <Text style={{ fontSize: 16 }}>{startDate.toLocaleDateString('pl-PL')}</Text>
            </TouchableOpacity>
          )}
          <Ionicons name="calendar-outline" size={20} color="#BD00FF" />
        </View>

        <Text style={styles.sectionLabel}>Koniec pobytu</Text>
        <View style={styles.inputContainer}>
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={toISODate(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', color: 'black' } as any}
            />
          ) : (
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => setShowPicker('end')}>
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

        <TouchableOpacity 
          style={[styles.saveButton, { marginTop: 40 }]} 
          onPress={handleUpdate} 
          disabled={saving}
        >
          {saving ? <ActivityIndicator color="white" /> : <Text style={styles.saveButtonText}>Zapisz zmiany</Text>}
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}