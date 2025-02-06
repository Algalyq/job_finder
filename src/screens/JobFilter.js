import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import CitySelector from '../components/CitySelector';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Ionicons } from '@expo/vector-icons';
import config from '../../config';
import { useNavigation, useRoute } from '@react-navigation/native';

const FilterScreen = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [fetchJobs, setFetchJobs] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [selectedPartTime, setSelectedPartTime] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [selectedPublishTime, setSelectedPublishTime] = useState('За месяц');
  const [income, setIncome] = useState('');
  const [countJobs, setCountJobs] = useState(0);
  const [title, setTitle] = useState('');
  const toggleModal = () => setModalVisible(!isModalVisible);
  const navigation = useNavigation();
  const route = useRoute(); // Get params passed from previous screen



  const schedules = ['Полный день', 'Удаленный график', 'Гибкий график'];
  const partTimeOptions = ['От 4 часов в день', 'По выходным'];
  const publishTimes = ['За месяц', 'За неделю', 'За последние 3 дня'];
  const publishMap = {'За месяц': 'month', 'За неделю': 'week', 'За последние 3 дня': '3days'}
  const schedulesMap = { 'Полный день': 'full-time', 'Удаленный график': 'remote', 'Гибкий график': 'hybrid'}

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      console.log("Route Param from header: ", data);

      // Set state based on route params
      setIncome(data.income || '');
      setSelectedCities(data.selectedCities || []);
      setSelectedCurrency(data.selectedCurrency || []);
      setSelectedPartTime(data.selectedPartTime || []);
      setSelectedPublishTime(data.selectedPublishTime || 'За месяц');
      setSelectedSchedule(data.selectedSchedule || []);
      setTitle(data.title || '');
    }
  }, [route.params]); // Run when route.params changes


  const toggleCurrency = (item) => {
    setSelectedCurrency((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((c) => c !== item)
        : [...prevSelected, item]
    );
  };
  
  const toggleSelection = (option, selectedOptions, setSelectedOptions) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleScheduleChange = (schedule) => {
    if (selectedSchedule.includes(schedule)) {
      setSelectedSchedule(selectedSchedule.filter((s) => s !== schedule));
    } else {
      setSelectedSchedule([...selectedSchedule, schedule]);
    }
  };

  
  const renderToggleButton = (item, selectedOptions, setSelectedOptions) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.toggleButton,
        selectedOptions.includes(item) && styles.toggleButtonSelected,
      ]}
      onPress={() => toggleSelection(item, selectedOptions, setSelectedOptions)}
    >
      <Text
        style={[
          styles.toggleButtonText,
          selectedOptions.includes(item) && styles.toggleButtonTextSelected,
        ]}
      >
        {item}
      </Text>

    </TouchableOpacity>
  );

  const handleRemoveCity = (city) => {
    setSelectedCities((prevCities) => prevCities.filter((c) => c !== city));
  };


  const fetchFilteredJobs = async () => {
    try {

      const jobTypeParams = selectedSchedule.map(schedule => `job_type=${encodeURIComponent(schedulesMap[schedule])}`).join('&');
      const response = await fetch(
        `${config.baseURL}/api/jobsf/?search=${title}${jobTypeParams}&location=${selectedCities.join(',')}&currency=${selectedCurrency.join(',')}&min_salary=${income}&publish_time=${publishMap[selectedPublishTime]}}`
      );
      const data = await response.json();
      setFetchJobs(data);
      setCountJobs(data.count);  
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
    fetchFilteredJobs();
  }, [selectedCities, selectedSchedule, income, publishMap[selectedPublishTime],selectedCurrency,title]);  // Dependency array

  const renderToggleButtonCity = (item,city) => (
    <View style={styles.toggleButtonCity} key={item}>
      <Text style={styles.toggleButtonTextCity}>
        {city}
      </Text>
    <TouchableOpacity onPress={() => handleRemoveCity(city)}>
      <Ionicons name="close-sharp" size={24} color="#000" />
    </TouchableOpacity>
    </View>
  );

  const handleCitySelection = (cities) => {
    setSelectedCities(cities);
    setModalVisible(false);
  };

  const handlePress = async () => {
    const initialData2 = {
      selectedCities,
      selectedCurrency,
      selectedPartTime,
      selectedPublishTime,
      selectedSchedule,
      income,
      title
    }
    
    if (fetchJobs.results && fetchJobs.results.results.length > 0) {
      navigation.navigate('Search', { jobsFilter: fetchJobs.results.results, dataFilters: initialData2 });
    } else {
      console.error('No jobs found to display');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Фильтры</Text>
        <FloatingLabelInput placeholder={"Должность, ключевые слова"} setTitle={setTitle} value={route.params.data.title}/>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Регион</Text>
        {selectedCities.length > 0 ? (<>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {selectedCities.map((item) => renderToggleButtonCity(item,item))}
        </ScrollView>
        </>) : (<></>)}
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Text style={styles.addButtonText}>
            {'+ Добавить регион'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <FloatingLabelInput placeholder={"Уровень дохода от"} keyboardType="number-pad" value={income} onChangeText={setIncome}/>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
  {['Теңге', 'Доллар', 'Евро'].map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.toggleButton,
        selectedCurrency.includes(item) && styles.toggleButtonSelected,
      ]}
      onPress={() => toggleCurrency(item)}
    >
      <Text
        style={[
          styles.toggleButtonText,
          selectedCurrency.includes(item) && styles.toggleButtonTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>

      </View>

        {/* График работы */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>График работы</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {schedules.map((item) => renderToggleButton(item, selectedSchedule, setSelectedSchedule))}
      </ScrollView>
      </View>

      {/* Подработка */}
      <View style={styles.section}>
      <Text style={styles.sectionLabel}>Подработка</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {partTimeOptions.map((item) => renderToggleButton(item, selectedPartTime, setSelectedPartTime))}
      </ScrollView>
      </View>

      {/* Время публикации */}
      <View style={styles.section}>
      <Text style={styles.sectionLabel}>Время публикации</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {publishTimes.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.toggleButton,
              selectedPublishTime === item && styles.toggleButtonSelected,
            ]}
            onPress={() => setSelectedPublishTime(item)}
          >
            <Text
              style={[
                styles.toggleButtonText,
                selectedPublishTime === item && styles.toggleButtonTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>


      <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
        <Text style={styles.submitButtonText}>Показать {countJobs || 0} вакансий</Text>
      </TouchableOpacity>

      {/* City Selector Modal */}
      <SafeAreaView style={styles.safe}>
      <Modal visible={isModalVisible} animationType="slide">
        <CitySelector
          selectedCities={selectedCities}
          onSave={handleCitySelection}
          onCancel={toggleModal}
        />
      </Modal>
      </SafeAreaView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 54,borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 },
  section: { marginBottom: 12 },
  sectionLabel: { fontSize: 16, marginBottom: 10 },
  addButton: { padding: 10,},
  addButtonText: { color: '#007bff' },
  toggleButtonCity: { backgroundColor: '#F1F4F9', paddingVertical: 10,paddingHorizontal: 15,  borderColor: '#ccc', borderRadius: 20, marginRight: 10,flexDirection: 'row', alignItems: 'center', gap: 4 },
  toggleButtonTextCity: { color: '#333', fontWeight: '700' },
  submitButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16 },
  scrollContainer: { marginBottom: 20 },
  sectionLabel: { fontSize: 16, marginBottom: 10 },
  scrollContainer: { marginBottom: 20 },
  toggleButton: { paddingVertical: 10,paddingHorizontal: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, marginRight: 10,
  },
  toggleButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  toggleButtonText: { color: '#333' },
  toggleButtonTextSelected: { color: '#fff' },
  safe: { flex: 1, padding: 20, backgroundColor: '#fff' },
});

export default FilterScreen;
