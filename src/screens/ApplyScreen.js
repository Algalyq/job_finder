import React, { useState } from 'react';
import 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import HeaderConfig from '../components/HeaderConfig';
import SvgUri from 'react-native-svg-uri';
import { Dimensions } from 'react-native';


const ApplyScreen = ({ route }) => {
//   const { height } = Dimensions.get('window');
  const { job } = route.params;
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleApply = () => {
    console.log('Applying for job...');
    console.log('Selected File:', selectedFile);
    console.log('Description:', description);
  };

  const handleDocumentSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'cancel') {
        console.log('User canceled document selection');
      } else {
        setSelectedFile(result);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <HeaderConfig job={job} />
        </View>

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Upload CV</Text>
          <Text style={styles.uploadSubtitle}>Add your CV/Resume to apply for a job</Text>
          <TouchableOpacity style={styles.container_upload} onPress={handleDocumentSelect}>
            <View style={styles.innerContainer}>
              <SvgUri
                source={require('../../assets/svg/Icon.svg')}
                style={styles.icon}
              />
              <Text style={styles.text}>Upload CV/Resume</Text>
            </View>
          </TouchableOpacity>
          {selectedFile && (
            <Text style={styles.selectedFile}>{selectedFile.name}</Text>
          )}
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>Information</Text>
          <TextInput
            style={styles.descriptionInput}
            multiline
            placeholder="Explain why you are the right person for this job"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyText}>APPLY NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 12,
  },
  card: {
    marginBottom: 20,
  },
  uploadSection: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadSubtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  container_upload: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderStyle: 'dashed',
    padding: 24,
  },
  selectedFile: {
    marginTop: 10,
    fontSize: 14,
  },
  descriptionSection: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionInput: {
    backgroundColor: '#fff',
    height:150,
    flexGrow:1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  applyButton: {
    backgroundColor: '#130160',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApplyScreen;
