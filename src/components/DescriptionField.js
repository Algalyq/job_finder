import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


const DescriptionField = ({ visible, onClose, onSelect }) => {
    const navigation = useNavigation();
    const [description, setDescription] = useState(''); 
    const [modalPosition, setModalPosition] = useState(0);
  
    const handleSave = () => {
      onSelect(description);
      onClose();
    };
  
    const handleGestureEvent = (event) => {
      const { translationY } = event.nativeEvent;
      setModalPosition(translationY);
    };
  
    const handleStateChange = (event) => {
      const { translationY, state } = event.nativeEvent;
      if (state === State.END) {
        if (translationY > 100) {
          onClose(); 
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
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Enter description (optional)"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={6}
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
  descriptionInput: {
    backgroundColor: '#fff',
    height: 160,
    width: 320,
    flexGrow: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#000',
    textAlignVertical: 'top',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 2, // Shadow radius
},
});

export default DescriptionField;
