import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import RadioButtonGroup from 'react-native-radio-buttons-group'; // Import the radio button group library


const EmploymentType = ({ visible, onClose, onSelect }) => {
    const navigation = useNavigation();
    const [modalPosition, setModalPosition] = useState(0);
    const [selectedWorkplace, setSelectedWorkplace] = useState('Full-Time');
  
    const radioButtonsData = [
      { id: 'Full-Time', label: 'Full-Time', value: 'Full-Time' },
      { id: 'Part-Time', label: 'Part-time', value: 'Part-time' },
      { id: 'Remote', label: 'Remote\nEmployees working off site', value: 'Remote' },
    ];
  
    const onPress = (radioButtonValue) => {
      setSelectedWorkplace(radioButtonValue);
    };
  
    const handleSave = () => {
      onSelect(selectedWorkplace);
      onClose(); // Call onClose prop to close the modal
    };
  
    const handleGestureEvent = (event) => {
      const { translationY } = event.nativeEvent;
      setModalPosition(translationY);
    };
  
    const handleStateChange = (event) => {
      const { translationY, state } = event.nativeEvent;
      if (state === State.END) {
        if (translationY > 100) {
          onClose(); // Close the modal using the onClose prop
        } else {
          setModalPosition(0);
        }
      }
    };
  
    return (
      <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <PanGestureHandler onGestureEvent={handleGestureEvent} onHandlerStateChange={handleStateChange}>
            <View style={styles.modalContent}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>Choose the type of workplace</Text>
                <Text style={styles.modalSubtitle}>Decide and choose the type of place to work according to what you want</Text>
                <RadioButtonGroup
                radioButtons={radioButtonsData}
                onPress={onPress}
                selectedId={selectedWorkplace}
                containerStyle={styles.radioGroup}
                labelStyle={styles.radioLabel}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
            </PanGestureHandler>
        </View>
      </Modal>
    );
  };
  

const styles = StyleSheet.create({
    radioGroup: {
        flexDirection: 'column', // Arrange radio buttons and text horizontally
        alignItems: 'flex-start', // Align items to the top
        justifyContent: 'space-between',
     },
      radioLabel: {
        flex: 1, // Allow text to take up available space
        fontSize: 14,
        marginRight: 20,
        
      },
      saveButton: {
        backgroundColor: '#130160',
        paddingVertical: 14,
        borderRadius: 10,
        padding: 24,
        alignItems: 'center',
        marginTop: 16,
      },
      saveText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#130160',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2c2c54',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonSecondary: {
    backgroundColor: '#f1f1f1',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  modalButtonSecondaryText: {
    color: '#555',
  },
});

export default EmploymentType;
