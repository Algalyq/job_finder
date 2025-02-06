import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';



const HeaderConfig = ({ job }) => { 
  const navigation = useNavigation();
  console.log(job.logo)
  return (
    <View style={styles.header}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#130160" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: job.logo }}
          style={styles.logo}/>
      <Text style={styles.title}>{job.title}</Text>
      <View style={styles.subtitle}>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.time}>{job.relative_created_at}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  back: {
    position: 'absolute',
    alignSelf: 'flex-start'
  }
});

export default HeaderConfig;
