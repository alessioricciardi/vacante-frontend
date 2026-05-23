import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './send.styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MessagesScreen() {
  const router = useRouter();
  const chats = [
    {
      id: '1',
      name: 'Grand Hotel',
      time: '14:30',
      unread: true,
      icon: '🏨',
    },
    {
      id: '2',
      name: 'Hotel Europejski',
      time: '10:20',
      unread: true,
      icon: '🏩',
    },
    {
      id: '3',
      name: 'Wsparcie Vacante',
      time: '09:45',
      unread: false,
      icon: '',
    },
  ];

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.title}>Wiadomości</Text>
          <TouchableOpacity 
            style={styles.notificationBtn}
            onPress={() => router.push('/notifications')}
        >
            <Ionicons name="notifications-outline" size={30} color="black" />
            <View style={styles.headerBadge} />
        </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {chats.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatCard} activeOpacity={0.8}>

              <View style={styles.iconContainer}>
                {chat.icon ? (
                  <Text style={styles.hotelIcon}>{chat.icon}</Text>
                ) : null}
              </View>

              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{chat.name}</Text>
              </View>

              <View style={styles.metaContainer}>
                <Text style={styles.timeText}>{chat.time}</Text>
                {chat.unread && <View style={styles.unreadDot} />}
              </View>

            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </LinearGradient>
  );
}