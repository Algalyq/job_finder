import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import config from '../../config';
import axios from 'axios';  
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native'; 
const skills = [
  'Leadership',
  'Teamwork',
  'Visioner',
  'Target oriented',
  'Consistent',
  'Good communication skills',
  'Responsibility',
  'English',
];

const SkillSelectionScreen = () => {
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

  const handleSave = () => {
    setShowAddSkill(true);
    setNewSkills([...selectedSkills]);
  };

  useFocusEffect(
    React.useCallback(() => {
        // Fetch the profile data when the screen is focused
        const fetchProfile = async () => {
            try {
              const accessToken = await AsyncStorage.getItem('access');
                const response = await axios.get(`${config.baseURL}/api/profile/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSelectedSkills(response.data.skills);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [])  // Empty dependency array to run only on focus
);

  const handleAddSkillSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      const response = await fetch(`${config.baseURL}/api/profile/skills/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include auth token if required
        },
        body: JSON.stringify({ skills: newSkills }), // Send skills array in request body
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or navigate back)
        console.log('Skills saved successfully');
        setSelectedSkills([]);
        setNewSkills([]);
        setSearchQuery('');
        setShowAddSkill(false);
        navigation.goBack();
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error saving skills:', errorData);
        alert('Failed to save skills. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleDeleteSkill = (skill) => {
    setNewSkills(newSkills.filter((s) => s !== skill));  // Remove the skill from newSkills
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {!showAddSkill ? (
        <>
          <Text style={styles.addSkillTitle}>Select Skills</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#9A9A9A" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search skills"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9A9A9A"
            />
          </View>
          <View style={styles.skillsContainer}>
            {filteredSkills.map((skill) => (
              <TouchableOpacity
                key={skill}
                style={[styles.skillItem, selectedSkills.includes(skill) && styles.selectedSkill]}
                onPress={() => handleSkillSelect(skill)}
              >
                <Text style={[styles.skillText, selectedSkills.includes(skill) && styles.selectedSkillText]}>{skill}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.addSkillTitle}>Add Skill</Text>
          <View style={styles.addedSkillsContainer}>
            {newSkills.map((skill, index) => (
              <View key={index} style={styles.addedSkillItem}>
                <Text>{skill}</Text>
                <Ionicons
                  name="close-outline"
                  size={24}
                  color="#FF9500"
                  onPress={() => handleDeleteSkill(skill)}  // Attach delete handler to close icon
                />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleAddSkillSave}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addedSkillsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addedSkillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  addSkillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#130160',
  },
  skillsContainer: {
    flexDirection: 'column',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedSkill: {
    backgroundColor: 'orange',
  },
  skillText: {
    flex: 1,
  },
  saveButton: {
    position: 'absolute',
    bottom: 48,
    left: 20,
    right: 20,
    backgroundColor: '#15005B',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSkillText: {
    color: '#fff'
  }
});

export default SkillSelectionScreen;
