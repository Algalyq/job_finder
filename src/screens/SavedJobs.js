import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionMenuModal from "../components/ActionMenuModal";
import Footer from "../components/Footer";
import config from "../../config";

const SavedJobsPage = () => {
  const [jobsData, setJobsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(null); // Track modal for each job
  const navigation = useNavigation(); // React Navigation
  const [countSavedJobs, setCountSavedJobs] = useState(0);


  // Function to fetch saved jobs from the API
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/saved-jobs/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('access')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCountSavedJobs(data.count);
        setJobsData(data.jobs); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const openModal = (jobId) => {
    setModalVisible(jobId); // Show the modal for a specific job
  };

  const closeModal = () => {
    setModalVisible(null); // Close the modal
  };

  const navigateToPage = (item) => {
    console.log("Navigate: ", item);
    navigation.navigate('JobDetails', { job: item.job });
    closeModal(); // Close modal after navigation
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={()=> navigateToPage(item)}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.job.logo }} style={styles.logo} />
        <View style={styles.cardInfo}>
          <Text style={styles.jobTitle}>{item.job.title}</Text>
          <Text style={styles.jobCompany}>
            {item.job.company}
          </Text>
        </View>
        <TouchableOpacity onPress={() => openModal(item.id)}>
          <Feather name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>

        <ActionMenuModal
          visible={modalVisible === item.id} // Only show the modal for the clicked job
          onClose={closeModal}
          navigateToPage={() => navigateToPage(item)} // Pass navigate function
        />
      </View>
{/* 
      <View style={styles.tagsContainer}>
        {item.job.jdata.benefits.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View> */}

      <View style={styles.cardFooter}>
        <Text style={styles.time}>{item.job.relative_created_at}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Jobs</Text>
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {countSavedJobs} сақтаулы жұмыс
          </Text>
        </View>
      </View>

      {/* Job List */}
      <FlatList
        data={jobsData}
        keyExtractor={(item) => item.id.toString()} // Ensure you are using a unique key
        renderItem={renderJobItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Bottom Navigation */}
      <Footer />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: { 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  counter: {
    padding: 8
  },
  counterText: {
    fontSize: 16,    
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteAll: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    flex: 1,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCompany: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#1A237E',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
});

export default SavedJobsPage;
