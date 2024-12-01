import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HeaderConfig = ({ job }) => { // Accept job as a prop
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: job.logo }}
        style={styles.logo}
      />
      <Text style={styles.title}>{job.title}</Text>
      <View style={styles.subtitle}>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.time}>1 day ago</Text>
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
});

export default HeaderConfig;
