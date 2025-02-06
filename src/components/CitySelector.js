import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const cities = ['Aktobe', 'Санкт-Петербург', 'Краснодар', 'Самара', 'Нижний Новгород', 'Казань', 'Алматы'];

const CitySelector = ({ selectedCities, onSave, onCancel }) => {
  const [localSelection, setLocalSelection] = useState(selectedCities);

  const toggleCity = (city) => {
    setLocalSelection((prevSelection) =>
      prevSelection.includes(city)
        ? prevSelection.filter((c) => c !== city)
        : [...prevSelection, city]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Регион</Text>

      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cityItem} onPress={() => toggleCity(item)}>
            <Text style={styles.cityText}>{item}</Text>
            <View style={localSelection.includes(item) ? styles.checkboxSelected : styles.checkbox} />
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => onSave(localSelection)}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={onCancel}>
          <Text style={styles.resetButtonText}>Сбросить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  cityItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  cityText: { fontSize: 16 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderRadius: 4 },
  checkboxSelected: { width: 20, height: 20, backgroundColor: '#007bff', borderRadius: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  saveButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, flex: 1, marginRight: 10, alignItems: 'center' },
  resetButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 8, flex: 1, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16 },
  resetButtonText: { color: '#333', fontSize: 16 },
});

export default CitySelector;
