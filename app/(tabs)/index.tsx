import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './home.styles';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hej!</Text>
            <Text style={styles.subGreeting}>Dokąd dziś jedziemy?</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.searchContainer}
          activeOpacity={0.9}
          onPress={() => router.push('/search')}
        >
          <Ionicons name="search" size={20} color="#666" />
          <Text style={[styles.searchInput, { color: '#666', paddingTop: 0 }]}>
            Gdzie jedziesz?
          </Text>
          <Feather name="sliders" size={20} color="black" />
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          <TouchableOpacity style={styles.chipActive}>
            <Text style={styles.chipActiveText}>Lokalizacja</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Cena</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Opinie</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>Ostatnio przeglądane:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <DestinationCard title="SOPOT" date="1-5 MAJA" image="https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?q=80&w=400" />
          <DestinationCard title="ZAKOPANE" date="20-27 MAJA" image="https://images.unsplash.com/photo-1570114030635-430c51086036?q=80&w=400" />
        </ScrollView>

        <Text style={styles.sectionTitle}>POPULARNE HOTELE:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <HotelCard name="GRAND HOTEL" stars={4} image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400" />
          <HotelCard name="NOVOTEL" stars={5} image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400" />
        </ScrollView>

        <View style={{ height: 100 }} /> 
      </ScrollView>
    </LinearGradient>
  );
}

const DestinationCard = ({ title, date, image }: any) => (
  <ImageBackground source={{ uri: image }} style={styles.destinationCard}>
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{date}</Text>
    </View>
  </ImageBackground>
);

const HotelCard = ({ name, stars, image }: any) => (
  <ImageBackground source={{ uri: image }} style={styles.hotelCard} imageStyle={{ borderRadius: 25 }}>
    <Text style={styles.hotelName}>{name}</Text>
    <View style={styles.ratingRow}>
      {Array(stars).fill(0).map((_, i) => (
        <FontAwesome key={i} name="star" size={14} color="#FFD700" style={{ marginRight: 2 }} />
      ))}
    </View>
  </ImageBackground>
);