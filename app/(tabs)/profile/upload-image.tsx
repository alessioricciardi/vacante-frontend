import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import api from './services/api'; 
import { styles } from './edit-hotel.styles'; 

export default function UploadImageScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Najpierw wybierz zdjęcie!");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();

      if (Platform.OS === 'web') {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('Image', blob, 'photo.jpg');
      } else {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;
        
        formData.append('Image', {
          uri: image,
          name: filename,
          type,
        } as any);
      }

      await api.post('/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert("Zdjęcie wysłane pomyślnie!");
      router.back();

    } catch (error: any) {
      alert("Błąd wysyłania zdjęcia.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <View style={[styles.scrollView, { alignItems: 'center' }]}>
        
        <View style={[styles.header, { width: '100%' }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="caret-back" size={32} color="#BD00FF" />
          </TouchableOpacity>
          <Text style={styles.title}>Dodaj obrazek</Text>
          <View style={{ width: 32 }} />
        </View>

        <TouchableOpacity 
          style={[styles.imageContainer, { marginTop: 40, borderStyle: 'dashed', borderWidth: 2, borderColor: '#BD00FF', backgroundColor: 'transparent' }]} 
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="cloud-upload-outline" size={60} color="#BD00FF" />
              <Text style={{ color: '#BD00FF', fontWeight: 'bold', marginTop: 10 }}>Kliknij, aby wybrać plik</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, { width: '100%', marginTop: 20 }, uploading && { opacity: 0.7 }]} 
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Wyślij na serwer</Text>
          )}
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}