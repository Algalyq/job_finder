import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { API_BASE_URL } from '../../constants/config'
const skills = [
  'Көшбасшылық',
  'Топтық жұмыс',
  'Мәселелерді шешу',
  'Қарым-қатынас',
  'Жобаларды басқару',
  'Уақытты басқару',
  'Бейімделу',
  'Сыни ойлау',
  'Ынтымақтастық',
  'Шешім қабылдау',
];

const SkillSelection = () => {
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newSkills, setNewSkills] = useState([]);
  const navigation = useNavigation();

  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSave = async () => {
    setShowAddSkill(true);
    const updatedSkills = [...selectedSkills];
    setNewSkills(updatedSkills);
    await handleAddSkillSave(updatedSkills);  // Pass skills directly
  };

  const handleAddSkillSave = async (skills) => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      const response = await fetch(`${API_BASE_URL}/api/profile/skills/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ skills: skills }),
      });

      if (response.ok) {
        console.log('Skills saved successfully');
        setSelectedSkills([]);
        setNewSkills([]);
        setSearchQuery('');
        setShowAddSkill(false);
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error('Error saving skills:', errorData);
        alert('Дағдыларды сақтау сәтсіз аяқталды. Қайталап көріңіз.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Күтпеген қате орын алды. Кейінірек қайталап көріңіз.');
    }
  };

  const handleDeleteSkill = (skill) => {
    setNewSkills(newSkills.filter((s) => s !== skill));
  };

  const filteredSkills = skills.filter(
    (skill) =>
      !selectedSkills.includes(skill) && // Exclude skills already selected
      skill.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('access');
          const response = await axios.get(`${API_BASE_URL}/api/profile/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setSelectedSkills(response.data.skills || []); // Default to empty array if no skills
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#130160" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Дағдыларды басқару</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#9A9A9A" />
        <TextInput
          style={styles.searchInput}
          placeholder="Дағдыларды іздеу"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9A9A9A"
        />
      </View>

      {selectedSkills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Сіздің дағдыларыңыз</Text>
          <View style={styles.skillsContainer}>
            {selectedSkills.map((skill) => (
              <TouchableOpacity
                key={skill}
                style={[styles.skillItem, styles.selectedSkill]}
                onPress={() => handleSkillSelect(skill)}
              >
                <Text style={styles.selectedSkillText}>{skill}</Text>
                <Ionicons name="close-circle-outline" size={20} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {filteredSkills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Ұсынылған дағдылар</Text>
          <View style={styles.skillsContainer}>
            {filteredSkills.map((skill) => (
              <TouchableOpacity
                key={skill}
                style={styles.skillItem}
                onPress={() => handleSkillSelect(skill)}
              >
                <Text style={styles.skillText}>{skill}</Text>
                <Ionicons name="add-circle-outline" size={20} color="#130160" />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>ДАЙЫН</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#130160',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#130160',
    marginTop: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#130160',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  selectedSkill: {
    backgroundColor: '#FF9500',
  },
  skillText: {
    fontSize: 14,
    color: '#130160',
  },
  selectedSkillText: {
    color: '#fff',
  },
  saveButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#130160',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SkillSelection;