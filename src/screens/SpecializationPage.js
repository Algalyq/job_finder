import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const SpecializationCard = ({ specialization, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.specializationCard, specialization.selected && styles.selectedCard]}>
      <Image source={{ uri: specialization.icon }} style={styles.specializationIcon} />
      <Text style={styles.specializationTitle}>{specialization.title}</Text>
      <Text style={styles.specializationJobs}>{specialization.jobs} Jobs</Text>
    </View>
  </TouchableOpacity>
);

const SpecializationPage = () => {
  const categories = ['Design', 'Engineering', 'Marketing','Design', 'Engineering', 'Marketing',];
  const subCategories = ['UI/UX Design', 'Web Development', 'SEO'];
  const locations = ['California', 'New York', 'Texas'];

  const [specializations, setSpecializations] = useState([
    {
      id: '1',
      icon: 'https://via.placeholder.com/40',
      title: 'Design',
      jobs: 140,
      selected: false,
    },
    {
      id: '2',
      icon: 'https://via.placeholder.com/40',
      title: 'Finance',
      jobs: 250,
      selected: false,
    },
    {
      id: '3',
      icon: 'https://via.placeholder.com/40',
      title: 'Education',
      jobs: 120,
      selected: false,
    },
    {
      id: '4',
      icon: 'https://via.placeholder.com/40',
      title: 'Restaurant',
      jobs: 85,
      selected: false,
    },
    {
      id: '5',
      icon: 'https://via.placeholder.com/40',
      title: 'Health',
      jobs: 235,
      selected: false,
    },
    {
      id: '6',
      icon: 'https://via.placeholder.com/40',
      title: 'Programmer',
      jobs: 412,
      selected: false,
    },
  ]);

  const [lastPress, setLastPress] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = (id) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
  
    if (lastPress && now - lastPress < DOUBLE_PRESS_DELAY) {
      const selectedSpecialization = specializations.find((spec) => spec.id === id);
      navigation.navigate('FilterScreen', {categories,subCategories,locations});
    } else {
      setSpecializations((prevSpecializations) =>
        prevSpecializations.map((spec) =>
          spec.id === id
            ? { ...spec, selected: true } // Select the current specialization
            : { ...spec, selected: false } // Deselect all others
        )
      );
    }
  
    setLastPress(now);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Specialization</Text>

      <FlatList
        data={specializations}
        renderItem={({ item }) => (
          <SpecializationCard
            specialization={item}
            onPress={() => handlePress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.specializationList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#f7a84f',
    padding: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  specializationList: {
    paddingTop: 8,
  },
  specializationCard: {
    width: Dimensions.get('window').width / 2.1 - 24, // Adjust width for 2 columns with spacing
    height: 180, // Fixed height
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#fef3e6',
    borderWidth: 2,
    borderColor: '#f7a84f',
  },
  specializationIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  specializationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specializationJobs: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default SpecializationPage;
