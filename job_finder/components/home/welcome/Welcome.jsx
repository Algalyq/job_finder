import React, { useState,useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';
import  useFetchProfile  from '../../../hook/useFetchProfile';
const jobTypes = ['Full-time', 'Part-time', 'contractor'];

const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  const router = useRouter();
  
  const { profile } = useFetchProfile(); 
  console.log(profile)
  const [activeJobType, setActiveJobType] = useState('Full-time');
  const [fullName, setFullName] = useState('Dear Guest');

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]); 
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {fullName}</Text>
        <Text style={styles.welcomeMessage}> Find your Perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} value={searchTerm} onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?" />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)}
            onPress={()=>{
              setActiveJobType(item);
              router.push(`/search/${item}`)
            }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )} 
          keyExtractor={item => item}
          contentContainerStyle={{columnGap : SIZES.small}}
          horizontal
          />
      </View>
    </View>
  )
}

export default Welcome