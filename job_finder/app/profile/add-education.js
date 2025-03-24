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
 
const AddEducation = () => {
    const navigation = useNavigation();
    const [experiences, setExperiences] = useState([
      { id: '',level_of_education: '', university_name: '',field_of_study: '', start_date: '', end_date: '', description: '', currentPosition: false },
    ]);
    const [showDatePicker, setShowDatePicker] = useState({ index: null, field: '', visible: false });
    const [selectedDate, setSelectedDate] = useState(new Date()); // Temporary selected date
    

    const formatDate = (date) => {
      if(!date) return null;
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };


    const addExperience = () => {
      setExperiences([...experiences,  { level_of_education: '', university_name: '',field_of_study: '', start_date: '', end_date: '', description: '', currentPosition: false }]);
    };

    useEffect(() => {
      const fetchExperiences = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('access');
          const response = await axios.get(`${API_BASE_URL}/api/profile/education/list`, {
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
          `${API_BASE_URL}/api/profile/education/`,
          { educations: experiencesToSave },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log("educations", experiencesToSave)
    
        if (response.data.errors && response.data.errors.length > 0) {
          console.error('Errors saving experiences:', response.data.errors);
          alert("Кейбір тәжірибелерді сақтау сәтсіз аяқталды.");
        } else {
          console.log('Experience saved', response.data);
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error saving experience', error);
        alert("Тәжірибені сақтау кезінде қате орын алды.");
      }
    };
  
    const handleInputChange = (index, field, value) => {
      const updatedExperiences = experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      );
      setExperiences(updatedExperiences);
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
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#130160" />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Білім тәжірибесін қосу</Text>
  
          {experiences.map((experience, index) => (
          <View key={index} style={styles.experienceBlock}>
            <Text style={styles.label}>Білім деңгейі</Text>
            <TextInput
              style={styles.input}
              placeholder="Білім деңгейін енгізіңіз"
              value={experience.level_of_education}
              onChangeText={(text) => handleInputChange(index, 'level_of_education', text)}
            />

    <Text style={styles.label}>Оқу орнының атауы</Text>
    <TextInput
      style={styles.input}
      placeholder="Оқу орнының атауын енгізіңіз"
      value={experience.university_name}
      onChangeText={(text) => handleInputChange(index, 'university_name', text)}
    />

<Text style={styles.label}>Мамандық</Text>
    <TextInput
      style={styles.input}
      placeholder="Мамандықты енгізіңіз"
      value={experience.field_of_study}
      onChangeText={(text) => handleInputChange(index, 'field_of_study', text)}
    />

    <View style={styles.dateContainer}>
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Басталу күні</Text>
        <TouchableOpacity onPress={() => openDatePicker(index, 'start_date')}>
          <Text style={styles.dateText}>
            {experience.start_date ? experience.start_date : 'Басталу күнін таңдаңыз'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Аяқталу күні</Text>
        <TouchableOpacity
          onPress={() => !experience.currentPosition && openDatePicker(index, 'end_date')} // Prevent opening if currentPosition is true
        >
          <Text
            style={[
              styles.dateText,
              experience.currentPosition ? styles.disabledInput : {}, // Style for disabled input
            ]}
          >
            {experience.end_date ? experience.end_date : (experience.currentPosition ? 'Жалғасуда' : 'Аяқталу күнін таңдаңыз')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Add button to toggle current position */}
    <TouchableOpacity
       style={[styles.toggleButton, experience.currentPosition ? styles.currentPositionActive : null]}
       onPress={() => handleInputChange(index, 'currentPosition', !experience.currentPosition)}
    >
      <Text style={[styles.toggleButtonText, experience.currentPosition ? styles.currentPositionActiveText : null]}>Ағымдағы оқу
      </Text>
    </TouchableOpacity>

    <Text style={styles.label}>Сипаттама</Text>
    <TextInput
      style={[styles.input, { height: 80 }]}
      placeholder="Write additional information here"
      multiline
      value={experience.description}
      onChangeText={(text) => handleInputChange(index, 'description', text)}
    />
  </View>
))}

  
          <TouchableOpacity style={styles.addButton} onPress={addExperience}>
            <Text style={styles.addButtonText}>+ Басқа жұмыс тәжірибесін қосыңыз</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.saveButton} onPress={saveExperience}>
            <Text style={styles.saveButtonText}>Сақтау</Text>
          </TouchableOpacity>
        </ScrollView>
  
        {/* Render DateTimePicker only when visible */}
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
  },
});

export default AddEducation;
