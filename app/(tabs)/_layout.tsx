import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 65,
        borderRadius: 35,
        backgroundColor: '#F8F9FA',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingBottom: 0,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#BD00FF',
    }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="favorites" options={{ 
        tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="search" options={{ 
        tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="send" options={{ 
        tabBarIcon: ({ color }) => <Ionicons name="paper-plane-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{ 
        tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
      }} />
      <Tabs.Screen 
        name="notifications" 
        options={{ 
        href: null
      }} />
      <Tabs.Screen 
  name="search-results" 
  options={{ 
    href: null 
  }} 
/>
    <Tabs.Screen 
  name="hotel-details" 
  options={{ href: null }} 
/>
    </Tabs>
    
  );
}