import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import api from './services/api';
import { styles } from './edit-hotel.styles';

export default function AddHotelScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !address || !city || !country || !imageUri) {
      alert("Wypełnij wszystkie pola i dodaj zdjęcie!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      if (Platform.OS === 'web') {
        const res = await fetch(imageUri);
        const blob = await res.blob();
        formData.append('Image', blob, 'hotel.jpg');
      } else {
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('Image', { uri: imageUri, name: filename, type } as any);
      }

      const imgResponse = await api.post('/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageNameFromApi = imgResponse.data;

      const hotelPayload = {
        name,
        pricePerNight: parseFloat(price),
        description,
        address,
        city,
        country,
        images: [imageNameFromApi]
      };

      await api.post('/api/hotels', hotelPayload);

      if (Platform.OS === 'web') {
        window.alert("Hotel został dodany!");
      } else {
        Alert.alert("Sukces", "Hotel został dodany!");
      }

      router.replace('/profile/my-hotels' as any);

    } catch (error: any) {
      alert("Błąd podczas dodawania hotelu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>
          <Text style={styles.title}>Dodaj hotel</Text>
          <View style={{ width: 32 }} />
        </View>

        <Text style={styles.sectionLabel}>Zdjęcie obiektu</Text>
        <TouchableOpacity 
          style={[styles.imageContainer, { borderStyle: 'dashed', borderWidth: 2, borderColor: '#BD00FF', backgroundColor: 'transparent' }]} 
          onPress={pickImage}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="camera-outline" size={50} color="#BD00FF" />
              <Text style={{ color: '#BD00FF', fontWeight: 'bold' }}>Wybierz zdjęcie z dysku</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Nazwa hotelu</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Wpisz nazwę..." 
          />
        </View>

        <Text style={styles.sectionLabel}>Cena za noc (zł)</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={price} 
            onChangeText={setPrice} 
            keyboardType="numeric" 
            placeholder="0.00" 
          />
        </View>

        <Text style={styles.sectionLabel}>Adres</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            value={address} 
            onChangeText={setAddress} 
            placeholder="Ulica i numer..." 
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <Text style={styles.sectionLabel}>Miasto</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Miasto" />
            </View>
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.sectionLabel}>Kraj</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="Kraj" />
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Opis obiektu</Text>
        <View style={styles.textAreaContainer}>
          <TextInput 
            style={[styles.input, { textAlignVertical: 'top' }]} 
            value={description} 
            onChangeText={setDescription} 
            multiline 
            numberOfLines={5} 
            placeholder="Dodaj opis hotelu..."
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, loading && { opacity: 0.7 }]} 
          onPress={handleSubmit} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Opublikuj hotel</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}