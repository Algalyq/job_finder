import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const CompanyList = ({ visible, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState('');

  const companies = [
    {
      name: 'Google',
      logo: require('../../assets/svg/Icon.svg'), // Replace with actual image path
      description: 'Company · Internet',
    },
    {
      name: 'Apple',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Electronic goods',
    },
    {
      name: 'Amazon',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Internet',
    },
    {
      name: 'Dribbble',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Design',
    },
    {
      name: 'Twitter',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Internet',
    },
    {
      name: 'Facebook',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Internet',
    },
    {
      name: 'Microsoft',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Computer software',
    },
    {
      name: 'Allianz',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Financial services',
    },
    {
      name: 'Adobe',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Computer software',
    },
    {
      name: 'AXA',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Insurance',
    },
    {
      name: 'Airbus',
      logo: require('../../assets/svg/Icon.svg'),
      description: 'Company · Aerospace',
    },
    
  ];

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal  visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="arrow-back" size={24} color="#130160" />
            </TouchableOpacity>
            <Text style={styles.title}>Company</Text>
          </View>

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

          <FlatList
            data={filteredCompanies}
            keyExtractor={(item) => item.name}
            style={{height: 400}}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item.name)}>
                <View style={styles.companyRow}>
                  <Image source={item.logo} style={styles.companyLogo} />
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{item.name}</Text>
                    <Text style={styles.companyDescription}>{item.description}</Text>
                  </View>
                </View>
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
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        justifyContent: 'flex-end'
        
      },
      contentContainer: {
        backgroundColor: '#FFFF',
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
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 32,
    height: 32,
    marginRight: 16,
    borderRadius: 8,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#130160',
  },
  companyDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default CompanyList;