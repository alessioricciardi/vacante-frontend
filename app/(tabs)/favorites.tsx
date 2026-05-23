import React from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './favorites.styles';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
    const router = useRouter();
    const favorites = [
        { id: '1', name: 'Grand Hotel', location: 'Sopot, Polska', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600' },
        { id: '2', name: 'Hotel Europejski', location: 'Kraków, Polska', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600' },
        { id: '3', name: 'Sheraton', location: 'Warszawa, Polska', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600' },
    ];

    return (
        <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Ulubione</Text>
                    <TouchableOpacity 
                        style={styles.notificationBtn}
                        onPress={() => router.push('/notifications')}
                    >
                        <Ionicons name="notifications-outline" size={30} color="black" />
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#666" />
                    <TextInput placeholder="Gdzie jedziesz?" style={styles.searchInput} />
                    <Feather name="sliders" size={20} color="black" />
                </View>

                <View style={styles.listContainer}>
                    {favorites.map((item) => (
                        <TouchableOpacity key={item.id} activeOpacity={0.9}>
                            <ImageBackground source={{ uri: item.image }} style={styles.favoriteCard}>
                                <View style={styles.heartIconContainer}>
                                    <Ionicons name="heart" size={32} color="#FF4B4B" />
                                </View>
                                
                                <View style={styles.cardOverlay}>
                                    <Text style={styles.hotelName}>{item.name}</Text>
                                    <Text style={styles.hotelLocation}>{item.location}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}