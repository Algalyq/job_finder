import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const JobLocation = ({ visible, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState('');
  const jobPositions = [
    'Aktobe',
    'Almaty',
    'Astana',
    'Los Ang',
  ];

  const filteredPositions = jobPositions.filter((position) =>
    position.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="arrow-back" size={24} color="#130160" />
            </TouchableOpacity>
            <Text style={styles.title}>Жұмыстың орналасқан жері</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#9A9A9A" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9A9A9A"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Icon name="close" size={20} color="#9A9A9A" />
              </TouchableOpacity>
            )}
          </View>

          {/* List of Positions */}
          <FlatList
            data={filteredPositions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => onSelect(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#130160',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#130160',
  },
  itemContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  itemText: {
    fontSize: 16,
    color: '#130160',
  },
});

export default JobLocation;
