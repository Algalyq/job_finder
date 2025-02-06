import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/Ionicons';

const ActionMenuModal = ({ visible, onClose, navigateToPage }) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Allow pan responder to track gestures
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Track vertical movement only
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        // Check if user swipes downward significantly
        if (gestureState.dy > 100) {
          onClose(); // Trigger the modal close
        }
      },
      onPanResponderRelease: () => {
        // Ensure no unintended state changes occur
      },
    })
  ).current;

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View
          style={styles.modalContainer}
          {...panResponder.panHandlers} // Attach PanResponder for swipe detection
        >
          {/* Drag Bar */}
          <View style={styles.dragBar} />

          {/* Menu Options */}
          <TouchableOpacity style={styles.option} onPress={() => alert("Send message pressed!")}>
            <Feather name="send" size={20} color="#333" />
            <Text style={styles.optionText}>Хабарлама жазу</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => alert("Delete pressed!")}>
            <Icon name="bookmark-outline" size={20} color="#333" />
            <Text style={styles.optionText}>Өшіру</Text>
          </TouchableOpacity>

          {/* Apply Button */}
          {/* <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              onClose();
              navigateToPage(); // Navigate to the selected page
            }}
          >
            <Feather name="check-circle" size={20} color="#fff" />
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: "stretch",
    height: 200
  },
  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 2,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2e1a76",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ActionMenuModal;
