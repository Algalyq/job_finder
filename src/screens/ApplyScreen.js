import React, { useState } from 'react';
import 'react-native-gesture-handler';
import * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Button } from 'react-native';
import HeaderConfig from '../components/HeaderConfig';
import SvgUri from 'react-native-svg-uri';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ApplyScreen = ({ route }) => {
//   const { height } = Dimensions.get('window');
  const { job } = route.params;
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation();
  const handleApply = () => {
    console.log('Applying for job...');
    console.log('Selected File:', selectedFile);
    console.log('Description:', description);
    setIsSubmitted(true);
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
  if (isSubmitted) {
    // Confirmation screen
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          <HeaderConfig job={job} />
        </View>
        <View style={styles.confirmationContainer}>
          {selectedFile && (
              <View style={styles.filePreview}>
              <View style={styles.fileDetails}>
                <View style={styles.fileIcon}>
                  <Text style={styles.fileTypeText}>PDF</Text>
                </View>
                <View>
                  <Text style={styles.fileName}>{selectedFile.name}</Text>
                  <Text style={styles.fileInfo}>
                    {`${(selectedFile.size / 1024).toFixed(1)} Kb • ${new Date(selectedFile.lastModified || Date.now()).toLocaleDateString()} at ${new Date(selectedFile.lastModified || Date.now()).toLocaleTimeString()}`}
                  </Text>
                </View>
              </View>
            </View>
          )}
<View style={{ flex: 1 }}>
  {/* Success Icon and Text Container */}
  <View style={styles.successIconContainer}>
    <View style={styles.successIcon}>
      <SvgUri source={require('../../assets/svg/successApply.svg')} />
    </View>
    <Text style={styles.successText}>Successful</Text>
    <Text style={styles.congratulationText}>
      Congratulations, your application has been sent
    </Text>
  </View>

  {/* Fixed Button Container */}
  <View style={styles.fixedButtonContainer}>
    <TouchableOpacity style={styles.similarJobButton}>
      <Text style={styles.similarJobText}>FIND A SIMILAR JOB</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.homeButton} 
     onPress={() => navigation.navigate('Search')}>
      <Text style={styles.homeText}>BACK TO HOME</Text>
    </TouchableOpacity>
  </View>
</View>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <HeaderConfig job={job} />
        </View>

        {/* Upload Section */}
{/* Upload Section */}
<View style={styles.uploadSection}>
  <Text style={styles.uploadTitle}>Upload CV</Text>
  <Text style={styles.uploadSubtitle}>Add your CV/Resume to apply for a job</Text>
  {!selectedFile ? (
    <TouchableOpacity style={styles.container_upload} onPress={handleDocumentSelect}>
      <View style={styles.innerContainer}>
        <SvgUri
          source={require('../../assets/svg/Icon.svg')}
          style={styles.icon}
        />
        <Text style={styles.text}>Upload CV/Resume</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.filePreview}>
      <View style={styles.fileDetails}>
        <View style={styles.fileIcon}>
          <Text style={styles.fileTypeText}>PDF</Text>
        </View>
        <View>
          <Text style={styles.fileName}>{selectedFile.name}</Text>
          <Text style={styles.fileInfo}>
            {`${(selectedFile.size / 1024).toFixed(1)} Kb • ${new Date(selectedFile.lastModified || Date.now()).toLocaleDateString()} at ${new Date(selectedFile.lastModified || Date.now()).toLocaleTimeString()}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setSelectedFile(null)} style={styles.removeFileButton}>
      <SvgUri
          source={require('../../assets/svg/Delete_Icon.svg')}
          style={styles.icon}
        />
        <Text style={styles.removeFileText}>Remove file</Text>
      </TouchableOpacity>
    </View>
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
  confirmationContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  successIconContainer: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    paddingHorizontal: 20, // Add some padding for text
  },
  successIcon: {
    alignContent: 'flex',
    marginBottom: 20, 
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10, // Space between title and the next text
    textAlign: 'center', // Center align the text
  },
  congratulationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center', // Center align the text
  },
  similarJobButton: {
    backgroundColor: '#e3e3fd',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  similarJobText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#130160',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  homeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
    jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobDetails: {
    fontSize: 14,
    color: '#6b6b6b',
    marginBottom: 20,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom of the screen
    left: 20,
    right: 20,
    alignItems: 'center',
  },
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
  filePreview: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'column',
    borderColor: '#d3d3d3',
    borderStyle: 'dashed',
     gap: 10,
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ff4c4c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  fileTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fileInfo: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  removeFileText: {
    color: '#ff4c4c',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  }
  
});

export default ApplyScreen;
