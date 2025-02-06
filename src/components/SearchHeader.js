import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import FilterScreen from "../screens/JobFilter";

export default function SearchHeader({ data }) {
  const navigation = useNavigation(); // Add navigation hook
  const [isModalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [searchQuery, setSearchQuery] = useState(data.title || "");
  const [searchHistory, setSearchHistory] = useState([
    { id: "1", title: "java", location: "Алматы" },
    { id: "2", title: "grandera", location: "Алматы", extra: "В названии компании" },
    { id: "3", title: "grandera", location: "Алматы" },
  ]);

  const handleSearch = (query) => {
    console.log("Search Query:", query);
    setSearchQuery(query);
    setModalVisible(false); // Close the modal after selecting a query
  };

  return (
    <>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setModalVisible(true)} // Open the modal on press
        >
          <Icon name="search-outline" size={20} color="#9A9A9A" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            editable={false} // Disable direct editing in the main header
            placeholder="Іздеу"
            placeholderTextColor="#aaa"
          />
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('FilterScreen', { data: {} })} // Pass an empty data object
          >
            <Icon name="options" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          transparent={true} // Makes the background transparent
          animationType="slide" // Slide in from the bottom
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView style={styles.modalOverlay} behavior="padding">
            <View style={styles.bottomSheet}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Icon name="search-outline" size={24} color="#9A9A9A" />
                <TextInput
                  style={styles.modalSearchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Должность, ключевые слова"
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close-outline" size={28} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Location Section */}
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Алматы</Text>
              </View>

              {/* Search History */}
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>История поиска</Text>
                {searchHistory.length === 0 ? (
                  <Text>No search history available</Text>
                ) : (
                  <FlatList
                    data={searchHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.historyItem}
                        onPress={() => handleSearch(item.title)}
                      >
                        <Text style={styles.historyTitleText}>{item.title}</Text>
                        <View style={styles.historyDetails}>
                          <Text style={styles.historySubtitle}>{item.location}</Text>
                          {item.extra && <Text style={styles.historyExtra}>{item.extra}</Text>}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}

                <TouchableOpacity style={styles.showAllButton}>
                  <Text style={styles.showAllText}>Смотреть всю</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#000",
  },
  filterContainer: {
    marginLeft: 8,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "суте", // Aligns the modal content at the bottom
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "70%", // Limit height to 70% of the screen
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
  },
  modalSearchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  locationContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  locationText: {
    fontSize: 16,
    color: "#000",
  },
  historyContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  historyTitle: {
    fontSize: 16,
    color: "#9A9A9A",
    marginBottom: 8,
  },
  historyItem: {
    marginBottom: 12,
  },
  historyTitleText: {
    fontSize: 16,
    color: "#000",
  },
  historyDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  historySubtitle: {
    fontSize: 14,
    color: "#9A9A9A",
  },
  historyExtra: {
    fontSize: 14,
    color: "#9A9A9A",
    marginLeft: 8,
  },
  showAllButton: {
    marginTop: 12,
  },
  showAllText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
