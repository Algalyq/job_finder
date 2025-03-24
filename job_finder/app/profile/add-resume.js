import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import as a module
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';
import { API_BASE_URL } from '../../constants/config'


const AddResume = () => {
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const navigation = useNavigation();
  const route = useRoute();  // Access route params


  const { resumeCV,name } = route.params || {};

  useEffect(() => {
    if (resumeCV && name) {
      setResume(resumeCV);
      setResumeName(name);
    }
  }, [resumeCV]);

  const handleDocumentSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', 
        copyToCacheDirectory: true,
      });

      if (result.type === 'cancel') {
        
        console.log('Document picker cancelled or error:', result);
      }else if (result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; 
        console.log('Selected file:', selectedFile);
        
        setResume(selectedFile);
        setResumeName(selectedFile.name);
      }
    } catch (err) {
      console.error('Error picking document:', err);
      alert('Құжатты таңдау кезінде қате');
    }
  };

  const handleSave = async () => {
    if (resume) {
      console.log('Resume to upload:', resume);
      const formData = new FormData();
      formData.append('resume', {
        uri: resume.uri, 
        name: resume.name, 
        type: resume.type, 
      });
  
      try {
        const accessToken = await AsyncStorage.getItem('access');

        const response = await axios.post(`${API_BASE_URL}/api/upload_resume/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (response.status === 200) {
          console.log('Resume uploaded successfully:', response.data);
          navigation.goBack();
        } else {
          console.error('Error uploading resume:', response);
          alert('Түйіндемені жүктеу сәтсіз аяқталды');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Түйіндемені жүктеу кезінде қате');
      }
    } else {
      alert('Түйіндемені таңдаңыз');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Түйіндеме қосу</Text>
      </View>
      {!resume ? (
      <View style={styles.resumeContainer}>
        <TouchableOpacity style={styles.container_upload} onPress={handleDocumentSelect}>
         <View style={styles.innerContainer}>
          <Icon name="file-upload-outline" size={24} color="#666" style={styles.icon} />
          <Text style={styles.resumeButtonText}>Түйіндемені жүктеу</Text>
          </View>
        </TouchableOpacity>
      </View>
      ) : (<>
      <View style={styles.resumeContainer}>
    <View style={styles.filePreview}>
      <View style={styles.fileDetails}>
        <View style={{flexDirection: 'row'}}>
        <View style={styles.fileIcon}>
          <Text style={styles.fileTypeText}>PDF</Text>
        </View>
        <View>
          <Text style={styles.fileName}>{resumeName}</Text>
          <Text style={styles.fileInfo}>
            {`${(resume.size / 1024).toFixed(1)} Kb • ${new Date(resume.lastModified || Date.now()).toLocaleDateString()} at ${new Date(resume.lastModified || Date.now()).toLocaleTimeString()}`}
          </Text>
        </View>
        </View>
        <TouchableOpacity onPress={() => setResume(null)} style={styles.removeFileButton}>
          <Icon name="delete-outline" size={24} color="#ff4c4c" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
    </View>
      </>)}

      <Text style={styles.description}>
        PDF форматындағы 5 МБ дейінгі файлдарды жүктеңіз. Бір рет жүктеп, келесі өтінімдерде қолдана аласыз.
      </Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>САҚТАУ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resumeContainer: {
    padding: 16
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  resumeButtonText: {
    fontSize: 16,
  },
  selectedResume: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#15005B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_upload: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderStyle: 'dashed',
    padding: 24,
  },
  filePreview: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'column',
    borderColor: '#d3d3d3',
    borderStyle: 'dashed',
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    color: '#000',
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

export default AddResume;