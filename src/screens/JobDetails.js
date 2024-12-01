import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView,SectionList} from 'react-native';
import Header from '../components/HeaderConfig';
import { useNavigation } from '@react-navigation/native';

const JobDetails = ({ route }) => {
  const { job } = route.params; // Assuming job details are passed via route
  const navigation = useNavigation();
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Header job={job}/>

      {/* Job Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>
          {job.description.substring(0, 150)}...
        </Text>
        <TouchableOpacity>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      </View>

      {/* Requirements Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        {job.requirements.map((req, index) => (
          <Text key={index} style={styles.requirement}>
            • {req}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Additional Information</Text>
      {Object.entries(job.informations).map(([key, value], index) => (
        <View key={index} style={styles.infoContainer}>
          <Text style={styles.infoKey}>
            • {key.charAt(0).toUpperCase() + key.slice(1)}:
          </Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      ))}
    </View>


  
      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton}  
      onPress={() => navigation.navigate('ApplyScreen',{job})}>
        <Text style={styles.applyText}>APPLY NOW</Text>
      </TouchableOpacity>
    </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    // backgroundColor: 'red',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  company: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  location: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  dot: {
    fontSize: 14,
    color: '#6D6D6D',
    marginHorizontal: 5,
  },
  time: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6D6D6D',
    lineHeight: 22,
  },
  readMore: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  requirement: {
    fontSize: 14,
    color: '#6D6D6D',
    lineHeight: 22,
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#130160',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'column',
    padding: 4,
    marginBottom: 5,
  },
  infoKey: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  infoValue: {
    flex: 1, 
  },
});

export default JobDetails;
