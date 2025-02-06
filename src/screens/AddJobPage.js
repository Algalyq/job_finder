import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import JobPositionModal from '../components/JobPositionModal';
import JobForm from '../components/JobForm';
import JobLocation from '../components/JobLocation';
import CompanyList from '../components/CompanyList';
import EmploymentType from '../components/EmploymentType';
import DescriptionField from '../components/DescriptionField';
import { useNavigation } from '@react-navigation/native';


const AddJobPage = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleTypeOfWork, setModalVisibleTypeOfWork] = useState(false);
  const [isModalVisibleJobLocation, setModalVisibleJobLocation] = useState(false);
  const [isModalVisibleCompanyList, setModalVisibleCompanyList] = useState(false);
  const [isModalVisibleEmploymentType, setModalVisibleEmploymentType] = useState(false);
  const [isModalVisibleDescription, setModalVisibleDescription] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
  const [description, setDescription] = useState(false);
  const [workplace, setWorkplace] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [company, setCompany] = useState(''); 
  const [employmentType, setEmploymentType] = useState(''); 

  
    const handleSelect = (position) => {
    setSelectedPosition(position);
    setModalVisible(false);
  };

  const handleSelectTypeOfWork = (type) => {
    setWorkplace(type);
    setModalVisibleTypeOfWork(false);
  };

  const handleSelectLocation = (location) => {
    setLocation(location);
    setModalVisibleJobLocation(false);
  };


  const handleSelectCompany = (company) => {
    setCompany(company);
    setModalVisibleCompanyList(false);
  };

  const handleSelectEmploymentType = (employmentType) => {
    setEmploymentType(employmentType);
    setModalVisibleEmploymentType(false);
  };

  const handleSelectDecription = (description) => {
    setDescription(description);
    setModalVisibleDescription(false);
  };

  const handleSave = () => {
    const newJob = { selectedPosition, location, company, description };
    navigation.navigate('JobPost', { job: newJob });
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a job</Text>
        <TouchableOpacity onPress={() => handleSave()}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => setModalVisible(true)}>
          <View style={styles.info}>
            <Text style={styles.fieldLabel}>Лауазым</Text>
            {selectedPosition && (
              <Text>{selectedPosition}</Text>
            )}
          </View>
          {selectedPosition ? (
              <Icon name="create-outline" size={24} color="#F1A10A" /> // Edit icon
            ) : (
              <Icon name="add-circle-outline" size={24} color="#F1A10A" /> // Add icon
            )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => setModalVisibleTypeOfWork(true)}>
          <View style={styles.info}>
          <Text style={styles.fieldLabel}>
            Type of workplace
          </Text>
          {workplace && (
              <Text>{workplace}</Text>
            )}
          </View>
          {workplace ? (
              <Icon name="create-outline" size={24} color="#F1A10A" /> // Edit icon
            ) : (
              <Icon name="add-circle-outline" size={24} color="#F1A10A" /> // Add icon
            )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => setModalVisibleJobLocation(true)}>
          <View style={styles.info}>
          <Text style={styles.fieldLabel}>Орналасқан қала</Text>
          
          {location && (
              <Text>{location}</Text>
            )}
          </View>
          {location ? (
              <Icon name="create-outline" size={24} color="#F1A10A" /> // Edit icon
            ) : (
              <Icon name="add-circle-outline" size={24} color="#F1A10A" /> // Add icon
            )}
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => setModalVisibleCompanyList(true)}>
            <View style={styles.info}>
          <Text style={styles.fieldLabel}>
            Компания 
          </Text>
          {company && (
              <Text>{company}</Text>
            )}
          </View>
          {company ? (
              <Icon name="create-outline" size={24} color="#F1A10A" /> // Edit icon
            ) : (
              <Icon name="add-circle-outline" size={24} color="#F1A10A" /> // Add icon
            )}
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => setModalVisibleEmploymentType(true)}>
          <View style={styles.info}>
          <Text style={styles.fieldLabel}>
            Employment Type
          </Text>
          {employmentType && (
              <Text>{employmentType}</Text>
            )}
          </View>
          {employmentType ? (
              <Icon name="create-outline" size={24} color="#F1A10A" /> // Edit icon
            ) : (
              <Icon name="add-circle-outline" size={24} color="#F1A10A" /> // Add icon
            )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldContainer}
          onPress={() => setModalVisibleDescription(true)}>
          <View style={{ flexDirection: 'column', gap: 4 }}>
            {/* Row for label and icon */}
            <View style={styles.info_desc}>
              <Text style={styles.fieldLabel}>Description</Text>
              <Icon
                name={description ? 'create-outline' : 'add-circle-outline'}
                size={24}
                color="#F1A10A"
              />
            </View>
            {/* Optional description text */}
            {description && (
              <View>
                <Text>{description}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

      </ScrollView>

      <JobPositionModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
      />

      <JobForm visible={isModalVisibleTypeOfWork}
          onClose={() => setModalVisibleTypeOfWork(false)}
          onSelect={handleSelectTypeOfWork}
          />

      <JobLocation 
        visible={isModalVisibleJobLocation}
        onClose={() => setModalVisibleJobLocation(false)}
        onSelect={handleSelectLocation}
        />
      
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <CompanyList 
        visible={isModalVisibleCompanyList}
        onClose={()=> setModalVisibleCompanyList(false)}
        onSelect={handleSelectCompany}
        />
    </View>

    <EmploymentType
      visible={isModalVisibleEmploymentType}
      onClose={() => setModalVisibleEmploymentType(false)}
      onSelect={handleSelectEmploymentType}
      />
      
      <DescriptionField 
        visible={isModalVisibleDescription}
        onClose={() => setModalVisibleDescription(false)}
        onSelect={handleSelectDecription}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#130160',
  },
  postButton: {
    fontSize: 16,
    color: '#F1A10A',
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#130160',
  },
  info: {
    flexDirection: 'column',
    gap: 4
  },
  info_desc: {
    flexDirection: 'row', // Ensures label and icon are in a row
    alignItems: 'center', // Vertically aligns items
    justifyContent: 'space-between', // Places text on the left and icon on the right
    width: '100%', // Takes full width of the parent container
  },
  

});

export default AddJobPage;
