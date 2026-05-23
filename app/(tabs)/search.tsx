import { Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './search.styles';

export default function SearchScreen() {
  const router = useRouter();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(800);
  const [type, setType] = useState('Wszystkie');
  const [startDate, setStartDate] = useState(new Date(2026, 4, 1));
  const [endDate, setEndDate] = useState(new Date(2026, 4, 5));
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(null);
    if (selectedDate) {
      if (showPicker === 'start') setStartDate(selectedDate);
      if (showPicker === 'end') setEndDate(selectedDate);
    }
  };

  return (
    <LinearGradient colors={['#F8FAFF', '#D1E3FF']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Szukaj!</Text>
        </View>

        <View style={styles.topSearchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput placeholder="Sopot" style={styles.topSearchInput} placeholderTextColor="#666" />
          <Feather name="sliders" size={20} color="black" />
        </View>

        <Text style={styles.sectionLabel}>Lokalizacja</Text>
        <View style={styles.inputFull}><Text style={{fontSize: 16}}>Sopot, Polska</Text></View>

        <Text style={styles.sectionLabel}>Daty</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.halfInput} onPress={() => setShowPicker('start')}>
            <Text>{formatDate(startDate)}</Text>
            <Ionicons name="calendar-outline" size={18} color="gray" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.halfInput} onPress={() => setShowPicker('end')}>
            <Text>{formatDate(endDate)}</Text>
            <Ionicons name="calendar-outline" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={showPicker === 'start' ? startDate : endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onDateChange}
          />
        )}

        <Text style={styles.sectionLabel}>Goście</Text>
        <View style={styles.row}>
          <CounterBox label="Dorośli" value={adults} onMinus={() => adults > 0 && setAdults(adults - 1)} onPlus={() => setAdults(adults + 1)} />
          <CounterBox label="Dzieci" value={children} onMinus={() => children > 0 && setChildren(children - 1)} onPlus={() => setChildren(children + 1)} />
        </View>

        <Text style={styles.sectionLabel}>Zakres cen</Text>
        <View style={styles.row}>
          <CounterBox 
            label="Min. cena" 
            value={`${minPrice} zł`} 
            onMinus={() => minPrice >= 50 && setMinPrice(minPrice - 50)} 
            onPlus={() => setMinPrice(minPrice + 50)} 
          />
          <CounterBox 
            label="Max. cena" 
            value={`${maxPrice} zł`} 
            onMinus={() => maxPrice > minPrice && setMaxPrice(maxPrice - 50)} 
            onPlus={() => setMaxPrice(maxPrice + 50)} 
          />
        </View>

        <Text style={styles.sectionLabel}>Typ zakwaterowania</Text>
        <View style={styles.chipRow}>
          {['Wszystkie', 'Hotel', 'Apartament'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.chip, type === item && styles.chipActive]}
              onPress={() => setType(item)}
            >
              <Text style={[styles.chipText, type === item && styles.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.searchButton} activeOpacity={0.8} onPress={() => router.push('/search-results')}>
          <Text style={styles.searchButtonText}>Szukaj!</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const CounterBox = ({ label, value, onMinus, onPlus }: any) => (
  <View style={styles.counterContainer}>
    <Text style={styles.counterLabel}>{label}</Text>
    <View style={styles.counterBox}>
      <TouchableOpacity onPress={onMinus}>
        <Ionicons name="remove-circle-outline" size={26} color="#5D9CEC" />
      </TouchableOpacity>
      <Text style={styles.counterText}>{value}</Text>
      <TouchableOpacity onPress={onPlus}>
        <Ionicons name="add-circle-outline" size={26} color="#5D9CEC" />
      </TouchableOpacity>
    </View>
  </View>
);