import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

const SearchModal = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(route.params.previousQuery || "");

  const handleSearch = () => {
    // Handle search logic here
    console.log("Search Query:", searchQuery);
    navigation.goBack(); // Close modal after search
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#9A9A9A" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Іздеу"
          placeholderTextColor="#aaa"
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "90%",
    height: 40,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SearchModal;
