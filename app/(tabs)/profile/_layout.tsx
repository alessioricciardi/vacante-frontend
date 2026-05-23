import { Stack } from 'expo-router';

export default function ProfileStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="reservations" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="my-hotels" />
      <Stack.Screen name="edit-hotel" />
      <Stack.Screen name="edit-reservation" />
      <Stack.Screen name="upload-image" />
      <Stack.Screen name="add-hotel" />
    </Stack>
  );
}