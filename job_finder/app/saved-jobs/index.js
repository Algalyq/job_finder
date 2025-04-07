import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  PanResponder,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileSections, Navbar } from "../../components"
import HeaderBtn from "../../components/shared/header-btn";
import { COLORS, icons } from "../../constants";
import axios from "axios";
import { Stack, useRouter } from "expo-router";
import { API_BASE_URL } from '../../constants/config'
import Ionicons from "@expo/vector-icons/Ionicons";

const SavedJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(null); // Track modal for each job
  const router = useRouter();
  const [countSavedJobs, setCountSavedJobs] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // PanResponder for swipe-to-close functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 100) {
          setModalVisible(null); // Close modal on swipe down
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await AsyncStorage.getItem("access");
        setAccessToken(token);
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    };
    initialize();
  }, []);

  // Fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/new-saved-jobs/`, {
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
    setModalVisible(jobId);
  };

  const closeModal = () => {
    setModalVisible(null);
  };

  const createNavigateToMessage = async (jobId) => {
    try {
      // Find the job in jobsData
      const job = jobsData.find(job => job.id === jobId);
      if (!job) {
        console.error('Job not found');
        return;
      }
      // Create message channel
      const response = await fetch(`${API_BASE_URL}/api/messages/channels/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          company: job.company,
          jobtitle: job.title,
          logo: job.logo,
          job_id: job.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create message channel');
      }

      router.push(`/messages/${job.id}`);
      closeModal();
    } catch (error) {
      console.error('Error creating message channel:', error);
    }
  };

  const toggleSaveJob = async (jobId) => {
    const isSaved = jobsData.some(job => job.id === jobId);
  
    try {
      if (isSaved) {
        // Delete saved job
        const response = await axios.delete(
          `${API_BASE_URL}/api/new-saved-jobs/${jobId}/`,
          {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          }
        );
  
        if (response.status === 204) {
          setJobsData(prev => prev.filter(job => job.id !== jobId));
          setCountSavedJobs(prev => prev - 1);
          setIsBookmarked(false);
        }
      } else {
        // Save the job again
        const response = await axios.post(
          `${API_BASE_URL}/api/new-saved-jobs/`,
          { job_id: jobId },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            }
          }
        );
  
        if (response.status === 201 || response.status === 200) {
          const newJob = response.data;
          setJobsData(prev => [...prev, newJob]);
          setCountSavedJobs(prev => prev + 1);
          setIsBookmarked(true)
        }
      }
  
      closeModal();
    } catch (err) {
      console.error("Error saving/deleting job:", err.response?.data || err.message);
    }
  };

  
  const navigateToPage = (item) => {
    router.push(`/job-details/${item.id}`)
    closeModal();
  };
  const [accessToken, setAccessToken] = useState(null);
  
  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToPage(item)}>
      <View style={styles.cardHeader}>
      <Image source={item.logo ? { uri: item.logo } : icons.watpad}
            style={styles.logo}
      />
        <View style={styles.cardInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobCompany}>{item.company}</Text>
        </View>
        <TouchableOpacity onPress={() => openModal(item.id)}>
          <Feather name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Inline Action Menu Modal */}
      <Modal
        visible={modalVisible === item.id}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={styles.modalContainer}
            {...panResponder.panHandlers}
          >
            <View style={styles.dragBar} />
            <TouchableOpacity
              style={styles.option}
              onPress={() => createNavigateToMessage(item.id)}
            >
              <Feather name="send" size={24} color={COLORS.tertiary} />
              <Text style={styles.optionText}>Хабарлама</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => toggleSaveJob(item.id)}
            >
             <Ionicons
              name={jobsData.some(job => job.id === item.id) ? "heart" : "heart-outline"}
              size={24}
              color={COLORS.tertiary}
            />
            <Text style={styles.optionText}>
              {jobsData.some(job => job.id === item.id)
                ? "Сақтаудан алып тастау"
                : "Қайта сақтау"}
            </Text>

             </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Таңдаулылар</Text>
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {countSavedJobs} сақталған жұмыс
          </Text>
        </View>
      </View>
      <FlatList
        data={jobsData}
        keyExtractor={(item) => item.id}
        renderItem={renderJobItem}
        contentContainerStyle={styles.listContent}
      />
      <Navbar />
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
    padding: 8,
  },
  counterText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCompany: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: "stretch",
    height: 200,
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 2,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default SavedJobs;