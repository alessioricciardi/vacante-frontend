import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import api from './services/api'; 
import { styles } from './edit-hotel.styles';

export default function EditHotelScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchHotelData();
  }, [id]);

  const fetchHotelData = async () => {
    try {
      const response = await api.get(`/api/hotels/${id}`);
      const h = response.data;
      
      setName(h.name);
      setPrice(h.pricePerNight.toString());
      setDescription(h.description || '');
      setAddress(h.address);
      setCity(h.city);
      setCountry(h.country);
      setImageUrl(h.images && h.images[0] ? h.images[0] : '');
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się pobrać danych hotelu.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name || !price || !address || !city || !country) {
      alert("Proszę wypełnić wymagane pola.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: name,
        pricePerNight: parseFloat(price),
        description: description,
        address: address,
        city: city,
        country: country,
        images: [imageUrl]
      };

      await api.put(`/api/hotels/${id}`, payload);

      if (Platform.OS === 'web') {
        window.alert("Sukces! Dane hotelu zostały zaktualizowane.");
        router.push('/(tabs)');
      } else {
        Alert.alert("Sukces", "Dane hotelu zostały zaktualizowane!", [
          { 
            text: "OK", 
            onPress: () => router.push('/(tabs)')
          }
        ]);
      }

    } catch (error: any) {
      alert("Błąd: Nie udało się zapisać zmian.");
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
          <Text style={styles.title}>Edytuj Hotel</Text>
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Dodaj zdjęcie</Text>
        <TouchableOpacity style={styles.imageContainer} activeOpacity={0.9}>
          <Image 
            source={{ uri: (imageUrl && !imageUrl.includes('example.com')) 
              ? imageUrl 
              : `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&sig=${id}` 
            }} 
            style={styles.image} 
          />
          <View style={styles.imageOverlay}>
            <Ionicons name="add" size={50} color="white" />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Nazwa</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Ionicons name="pencil" size={18} color="#BD00FF" />
        </View>

        <Text style={styles.sectionLabel}>Cena za noc (zł)</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={price} 
            onChangeText={setPrice} 
            keyboardType="numeric" 
          />
          <Ionicons name="pencil" size={18} color="#BD00FF" />
        </View>

        <Text style={styles.sectionLabel}>Adres</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />
          <Ionicons name="pencil" size={18} color="#BD00FF" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <Text style={styles.sectionLabel}>Miasto</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value={city} onChangeText={setCity} />
            </View>
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.sectionLabel}>Kraj</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value={country} onChangeText={setCountry} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Opis</Text>
        <View style={styles.textAreaContainer}>
          <TextInput 
            style={[styles.input, { textAlignVertical: 'top' }]} 
            value={description} 
            onChangeText={setDescription} 
            multiline 
            numberOfLines={5} 
          />
          <MaterialCommunityIcons name="spa" size={24} color="#BD00FF" style={{ alignSelf: 'flex-end' }} />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, saving && { opacity: 0.7 }]} 
          onPress={handleUpdate} 
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}