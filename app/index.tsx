import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './welcome.styles';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Vacante</Text>
        </View>

        <View style={styles.imageGallery}>
           <Image source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500' }} style={[styles.mainImage, styles.sideImage, { marginTop: 40 }]} />
           <Image source={{ uri: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=500' }} style={styles.mainImage} />
           <Image source={{ uri: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=500' }} style={[styles.mainImage, styles.sideImage, { marginTop: 40 }]} />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>Spełnij swoje marzenia już dziś</Text>
          <Text style={styles.subtitle}>Zabookuj swoje wakacje w 2 minuty</Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => router.push('/login')}
          >
          <Text style={styles.buttonText}>Zaczynajmy</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}