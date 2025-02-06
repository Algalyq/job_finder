import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image,ActivityIndicator,Appearance } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from '../components/SearchHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.js'

const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigation = useNavigation();
  console.log(job.logo);  
  const colorScheme = Appearance.setColorScheme('light');
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        console.log('API Endpoint:', config.baseURL);
        
        const accessToken = await AsyncStorage.getItem('access');
        if (!accessToken) {
          console.error('Access token is not available');
          return;
        }

        const response = await fetch(`${config.baseURL}/api/saved-jobs/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const savedJobs = data.jobs;
          const isJobSaved = savedJobs.some((savedJob) => savedJob.job.id === job.id);
          setIsBookmarked(isJobSaved);
        } else {
          console.error('Failed to fetch saved jobs');
        }
      } catch (error) {
        console.error('Error fetching saved job status:', error);
      }
    };

    fetchSavedStatus();
  }, [job.id]);

  const toggleBookmark = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (!accessToken) {
        console.error('Access token is not available');
        return;
      }

      if (isBookmarked) {
        console.log('API Endpoint:', process.env.REACT_APP_API_ENDPOINT);
        const response = await fetch(`${config.baseURL}/api/saved-jobs/${job.id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          setIsBookmarked(false);
        } else {
          console.error('Failed to remove job from saved list');
        }
      } else {
        const response = await fetch(`${config.baseURL}/api/saved-jobs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ job_id: job.id }),
        });
        if (response.ok) {
          setIsBookmarked(true);
        } else {
          console.error('Failed to save job');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLogoSource = () => {
    // If logo is a full URL, use it directly
    if (job.logo && (job.logo.startsWith('http://') || job.logo.startsWith('https://'))) {
      return { uri: job.logo };
    }
    
    // If logo is a relative path, prepend the base URL
    if (job.logo) {
      return { uri: `${config.baseURL}/${job.logo}` };
    }
    
    if(job.logo === null){
      return { uri: 'https://via.placeholder.com/150'}
    }
   
  };
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Image source={getLogoSource()} style={styles.jobLogo} />
        <TouchableOpacity onPress={toggleBookmark}>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#007BFF' : '#555'}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
          onPress={() => navigation.navigate('JobDetails', { job })}>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobCompany}>{job.company}</Text>
      <View style={styles.jobTagsContainer}>
        {job.jdata?.benefits?.map((tag, index) => (
          <Text key={index} style={styles.jobTag}>
            {tag}
          </Text>
        ))}
      </View>
      <View style={styles.jobFooter}>
        <Text style={styles.jobTime}>{job.relative_created_at}</Text>
        <Text style={styles.jobSalary}>
          {job.salary ? `$${job.salary}/Mo` : 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const SearchScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const [dataFilter, setDataFilter] = useState('');


  
  useEffect(() => {
    const { jobsFilter, dataFilters } = route.params || {};  

    const fetchJobs = async () => {
        const { jobsFilter, dataFilters } = route.params || {};
        if (jobsFilter && dataFilters) {
          setJobs(jobsFilter);  // Set filtered jobs
          setDataFilter(dataFilters);  // Set the data filters
          setLoading(false);
        }else{
        try {
        const response = await fetch(`${config.baseURL}/api/jobs/`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    }
    fetchJobs();
  
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <>
  <SafeAreaView style={styles.safeArea}>
  <SearchHeader data={dataFilter} />
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.jobList}
      />
      <Footer />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    // backgroundColor: Appearance.getColorScheme() === 'light' ? '#333' : '#fff',
  },
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  filterButton: {
    backgroundColor: '#2c2c54',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  filterTag: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  filterText: {
    color: '#333',
  },
  jobList: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  jobCompany: {
    color: '#555',
    marginVertical: 4,
  },
  jobTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  jobTag: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    color: '#555',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTime: {
    color: '#aaa',
  },
  jobSalary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addButton: {
    backgroundColor: '#2c2c54',
    borderRadius: 50,
    padding: 12,
  },
});

export default SearchScreen;