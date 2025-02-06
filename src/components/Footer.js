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


const Footer = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState(0);

  const toggleModal = () => {
    if (!isModalVisible) {
      setModalPosition(0); // Reset the modal position before showing
    }
    setModalVisible(!isModalVisible);
  };
  

  const handleGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    setModalPosition(translationY);
  };
  const handleStateChange = (event) => {
    const { translationY, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationY > 100) {
        setModalVisible(false); // Close modal if swiped down
      } else {
        setModalPosition(0); // Reset modal position if not swiped enough
      }
    }
  };

  return (
    <>
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Icon name="search-outline" size={24} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')}>
          <Icon name="bookmark-outline" size={24} color="#aaa" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.centerButton} onPress={toggleModal}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity> */}
         <TouchableOpacity  onPress={() => navigation.navigate('HomeScreen')}>
        <Icon name="chatbubble-outline" size={24} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Icon name="person-outline" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Modal View */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onHandlerStateChange={handleStateChange}
          >
            <View
              style={[
                styles.modalContent,
                { transform: [{ translateY: modalPosition }] },
              ]}
            >
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>What would you like to add?</Text>
              <Text style={styles.modalSubtitle}>
                Would you like to post your tips and experiences or create a job?
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleModal();
                  navigation.navigate('AddJobPage');
                }}
              >
                <Text style={styles.modalButtonText}>POST</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={toggleModal}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonSecondaryText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </PanGestureHandler>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 14,
    width: Dimensions.get('window').width,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#130160',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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

export default Footer;
