import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Svg, Path, SvgProps } from 'react-native-svg';
const JobCard = ({ job, onPress }) => {

  // console.log(job);

  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: job.job.logo || 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
            style={styles.companyLogo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.jobTitle}>{job.job.title}</Text>
          <Text style={styles.companyDetails}>
            {job.job.company} • {job.job.location}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookmark}>
          <Text style={styles.bookmarkText}>🔖</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.salary}>{job.job.salary || 'Not Disclosed'}</Text>

      <View style={styles.tagsContainer}>
      {job.job.jdata?.benefits?.length > 0 ? (
            job.job.jdata.benefits.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noBenefitsText}>No benefits available</Text>
          )}
        <TouchableOpacity style={styles.applyButton} onPress={onPress}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.relativeTime}>{job.job.relative_created_at}</Text>
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
