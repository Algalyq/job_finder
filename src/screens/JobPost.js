import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';

// Get the screen width dynamically

const JobPost = ({ route, navigation }) => {
    const screenWidth = Dimensions.get('window').width;
    const { job } = route.params || {};
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
  
        <View>
        <Text style={styles.headerTitle}>Shared a Job</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Image
            source={require('../../assets/svg/Icon.svg')} // Replace with your image
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>Orlando Diggs</Text>
            <Text style={styles.userLocation}>California, USA</Text>
          </View>
        </View>
  
        <View style={styles.body}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{job?.description || 'No description provided'}</Text>
  
            <View style={styles.jobDetails}>
              <View style={styles.jobDetailsHeader}>
                <Icon name="logo-apple" size={32} color="#000" />
                <Text style={styles.jobTitle}>{job?.selectedPosition || 'Job Title'}</Text>
              </View>
              <Text style={styles.jobDescription}>
                {job?.company || 'Company Name'} {' · '} 
                {job?.location || 'Job Location'} {' · '}
                On-site
              </Text>
              <TouchableOpacity style={styles.applicationButton}>
                <Text style={styles.applicationButtonText}>Application details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <>
        <View style={styles.fixedButtonContainer}>
                <TouchableOpacity style={styles.applicationButton}>
                    <Text style={styles.applicationButtonText}>
                        Post
                    </Text>
                </TouchableOpacity>
            </View>
        </>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between'
  },
  fixedButtonContainer: {
    padding: 16,
    justifyContent: 'center',
  },

  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  headerTitle: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: '#888',
  },
  body: {
    marginBottom: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  descriptionContainer: {
    width: Dimensions.get('window').width - 40,
    marginBottom: 16,
    padding: 16,
    gap: 8,
    backgroundColor: '#F8F8F9',
    borderRadius: 16
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
  },
  jobDetails: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  jobDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  jobDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  applicationButton: {
    backgroundColor: '#130160',
    padding: 12,
    borderRadius: 8,
  },
  applicationButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  addHashtag: {
    color: '#FBA928',
    fontSize: 16,
  },
});

export default JobPost;