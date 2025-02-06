import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
import SearchHeader from '../components/SearchHeader';
import SvgUri from 'react-native-svg-uri';

const NoResultsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader/>

      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <SvgUri source={require('../../assets/svg/Illustrasi.svg')} />
        </View>

        <Text style={styles.noResultsText}>No results found</Text>
        <Text style={styles.subText}>
          The search could not be found, please check spelling or write another word.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backButton: {
    marginRight: 16,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  illustration: {
    alignItems: 'center',
  },
  document: {
    width: 80,
    height: 80,
    backgroundColor: '#ffa500',
    borderRadius: 8,
    marginBottom: 16,
  },
  magnifyingGlass: {
    width: 60,
    height: 60,
    backgroundColor: '#8e44ad',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cross: {
    fontSize: 24,
    color: '#fff',
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default NoResultsScreen;