import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Svg, Path, SvgProps } from 'react-native-svg';
const JobCard = ({ job, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
            style={styles.companyLogo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyDetails}>
            {job.company} • {job.location}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookmark}>
          <Text style={styles.bookmarkText}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Salary */}
      <Text style={styles.salary}>{job.salary}</Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Full time</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Senior level</Text>
        </View>
        <View>
        <TouchableOpacity style={styles.applyButton} onPress={onPress}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  companyLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  companyDetails: {
    fontSize: 12,
    color: '#888',
  },
  salary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  applyButton: {
    backgroundColor: '#FFD3C0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    fontSize: 12,
    color: '#000',
  },
});

export default JobCard;
