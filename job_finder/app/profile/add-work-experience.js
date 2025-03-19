import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { API_BASE_URL } from '../../constants/config'

const AddWorkExperience = () => {
  const navigation = useNavigation();
  const [experiences, setExperiences] = useState([
    {id:'', job_title: '', company: '', start_date: '', end_date: '', description: '', currentPosition: false },
  ]);
  const [showDatePicker, setShowDatePicker] = useState({ index: null, field: '', visible: false });
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [deleteIds, setDeleteIds] = useState([]);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  
  const deleteExperience = (index) => {

    const experienceToDelete = experiences[index];

    if (experienceToDelete.id) {
      setDeleteIds((prevDeleteIds) => [...prevDeleteIds, experienceToDelete.id]);
    }

    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access');
        const response = await axios.get(`${API_BASE_URL}/api/profile/work_experience/list/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        

        const formattedExperiences = response.data.map((experience) => {
          const { duration, ...rest } = experience; 
          return {
            ...rest, 
            start_date: formatDate(experience.start_date),
            end_date: experience.end_date ? formatDate(experience.end_date) : null,
            currentPosition: experience.end_date ? false : true,
          };
        });

       
        setExperiences(formattedExperiences);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExperiences();
  }, []); 


  const handleInputChange = (index, field, value) => {
    const updatedExperiences = experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
  };
  
  
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { job_title: '', company: '', start_date: '', end_date: '', description: '', currentPosition: false },
    ]);
  };

  
  const openDatePicker = (index, field) => {
    setShowDatePicker({ index, field, visible: true });
    setSelectedDate(new Date()); 
  };

  const handleDateChange = (event, date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker({ index: null, field: '', visible: false });
      return;
    }
  
    if (date && showDatePicker.index !== null) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const { index, field } = showDatePicker;
      handleInputChange(index, field, formattedDate);
    }
  
    setShowDatePicker({ index: null, field: '', visible: false });
  };
  


  const saveExperience = async () => {
    try {
      // Format dates in the correct format before sending the request
      const experiencesToSave = experiences.map(({ currentPosition, ...experience }) => ({
        ...experience,
        start_date: formatDate(experience.start_date),
        end_date: experience.end_date ? formatDate(experience.end_date) : null,
      }));

      const accessToken = await AsyncStorage.getItem('access');
      const response = await axios.patch(
        `${API_BASE_URL}/api/profile/work_experience/`,
        { experiences: experiencesToSave, delete_ids: deleteIds },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      if (response.data.errors && response.data.errors.length > 0) {
        console.error('Errors saving experiences:', response.data.errors);
           } else {
        console.log('Experience saved', response.data);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving experience', error);
      alert("An error occurred while saving experiences.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#130160" />
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Add Work Experience</Text>

  {experiences.map((experience, index) => (
  <View key={index} style={styles.experienceBlock}>
    <Text style={styles.label}>Job Title</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter job title"
      value={experience.job_title}
      onChangeText={(text) => handleInputChange(index, 'job_title', text)}
    />

    <Text style={styles.label}>Company</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter company"
      value={experience.company}
      onChangeText={(text) => handleInputChange(index, 'company', text)}
    />

<View style={styles.dateContainer}>
  <View style={styles.dateInputContainer}>
    <Text style={styles.label}>Start Date</Text>
    <TouchableOpacity onPress={() => openDatePicker(index, 'start_date')}>
      <Text style={styles.dateText}>
        {experience.start_date ? experience.start_date : 'Select start date'}
      </Text>
    </TouchableOpacity>
  </View>
  <View style={styles.dateInputContainer}>
    <Text style={styles.label}>End Date</Text>
    <TouchableOpacity
      onPress={() => !experience.currentPosition && openDatePicker(index, 'end_date')} 
    >
      <Text
        style={[
          styles.dateText,
          experience.currentPosition ? styles.disabledInput : {}, 
        ]}
      >
        {experience.end_date ? experience.end_date : (experience.currentPosition ? 'Ongoing' : 'Select end date')}
      </Text>
    </TouchableOpacity>
  </View>
</View>

<TouchableOpacity
  style={[styles.toggleButton, experience.currentPosition ? styles.currentPositionActive : null]}
  onPress={() => handleInputChange(index, 'currentPosition', !experience.currentPosition)}
>
  <Text style={[styles.toggleButtonText, experience.currentPosition ? styles.currentPositionActiveText : null]}>
    Current Position
  </Text>
</TouchableOpacity>

<Text style={styles.label}>Description</Text>
<TextInput
  style={[styles.input, { height: 80 }]}
  placeholder="Write additional information here"
  multiline
  value={experience.description}
  onChangeText={(text) => handleInputChange(index, 'description', text)}
/>
<TouchableOpacity 
  style={styles.deleteButton} 
  onPress={() => deleteExperience(index)}
>
  <Text style={styles.deleteButtonText}>Delete</Text>
</TouchableOpacity>

  </View>
))}

        <TouchableOpacity style={styles.addButton} onPress={addExperience}>
          <Text style={styles.addButtonText}>+ Add another work experience</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveExperience}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>

      {showDatePicker.visible && (
        <DateTimePicker
          style={styles.dateTimePicker}
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  backButton:{
    // padding: 8
  },  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  experienceBlock: {
    marginBottom: 30,
    gap: 3
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#eef',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#15005B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#15005B',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateTimePicker: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
    toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eef',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#15005B',
    fontWeight: 'bold',
  },
  currentPositionActive: {
    backgroundColor: '#4CAF50', // Green when active
  },
  currentPositionActiveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0',  // Light gray background when disabled
    color: '#aaa',  // Light gray text color
    borderColor: '#ddd',  // Disabled border color
  },deleteButton: {
    backgroundColor: '#FF5252', // Red color for delete
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default AddWorkExperience;
