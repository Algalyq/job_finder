import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import CourseDiscountCard from '../components/CourseDiscountCard';
import HeadHuntingHome from '../../assets/headhunting.png';
import JobCard from './JobCard';

import { useNavigation } from '@react-navigation/native';

const { width: deviceWidth } = Dimensions.get('window');

const jobs = [
  {
    id: '1',
    title: 'Product Designer',
    company: 'Google inc',
    location: 'California, USA',
    salary: '$15K/Mo',
    logo: 'https://via.placeholder.com/150',
    description: 'Design, develop, and iterate on user-centric products to enhance user experience...',
    requirements: [
      '5+ years of experience in product design',
      'Proficiency in Figma, Adobe XD, or similar tools',
      'Strong portfolio showcasing past design projects',
    ],
    informations: {
      position: 'Senior Design',
      experience: 2,
      qualification: 'BSA',
      jobType: 'Full-time',
    }
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Google inc',
    location: 'California, USA',
    salary: '$15K/Mo',
    logo: 'https://via.placeholder.com/150',
    description: 'Design, develop, and iterate on user-centric products to enhance user experience...',
    requirements: [
      '5+ years of experience in product design',
      'Proficiency in Figma, Adobe XD, or similar tools',
      'Strong portfolio showcasing past design projects',
    ],
    informations: {
      position: 'Senior Design',
      experience: 2,
      qualification: 'BSA',
      jobType: 'Full-time',
    }
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'Google inc',
    location: 'California, USA',
    salary: '$15K/Mo',
    logo: 'https://via.placeholder.com/150',
    description: 'Design, develop, and iterate on user-centric products to enhance user experience...',
    requirements: [
      '5+ years of experience in product design',
      'Proficiency in Figma, Adobe XD, or similar tools',
      'Strong portfolio showcasing past design projects',
    ],
    informations: {
      position: 'Senior Design',
      experience: 2,
      qualification: 'BSA',
      jobType: 'Full-time',
    }
  },
];

export default function HomeScreen() {

  const navigation = useNavigation();
  const [offerTextContainerWidth, setOfferTextContainerWidth] = useState(0);

  const renderHeader = () => (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello</Text>
          <Text style={styles.username}>Orlando Diggs.</Text>
        </View>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Replace with the actual profile image URL
          style={styles.profileImage}
        />
      </View>

      {/* Offer Section */}
      <CourseDiscountCard />

      {/* Find Your Job Section */}
      <Text style={styles.sectionTitle}>Find Your Job</Text>
      <View style={styles.jobStatsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#AFECFE' }]}>
          <Image source={HeadHuntingHome} />
          <Text style={styles.statNumber}>44.5k</Text>
          <Text style={styles.statLabel}>Remote Job</Text>
        </View>
        <View style={styles.rightStatsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#BEAFFE' }]}>
            <Text style={styles.statNumber}>66.8k</Text>
            <Text style={styles.statLabel}>Full Time</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFD6AD' }]}>
            <Text style={styles.statNumber}>38.9k</Text>
            <Text style={styles.statLabel}>Part Time</Text>
          </View>
        </View>
      </View>

      {/* Recent Job List Title */}
      <Text style={styles.sectionTitle}>Recent Job List</Text>
    </>
  );

  const renderJob = ({ item }) => (
    <JobCard
      job={item}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader} // Non-scrollable header
        contentContainerStyle={styles.listContainer} // Styling for list
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#222',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    color: '#222',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  jobStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  rightStatsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
