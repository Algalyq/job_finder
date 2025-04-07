import React, { useState,useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';
import  useFetchProfile  from '../../../hook/useFetchProfile';
const jobTypes = ['Толық жұмыс күні', 'Жарты жұмыс күні', 'Келісімшарт'];
const jobTypesEn = {'Толық жұмыс күні':'Full-time', 'Жарты жұмыс күні':'Part-time', 'Келісімшарт':'Freelance'};
const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  const router = useRouter();
  
  const { profile } = useFetchProfile(); 
  const [activeJobType, setActiveJobType] = useState('Толық жұмыс күні');
  const [fullName, setFullName] = useState('Құрметті қонақ');

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]); 
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Сәлем {fullName}</Text>
        <Text style={styles.welcomeMessage}>Өзіңізге лайықты жұмыс табыңыз</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} value={searchTerm} onChangeText={(text) => setSearchTerm(text)}
            placeholder="Нені іздеп жатырсыз?" />
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
                router.push(`/search/${jobTypesEn[item]}`)
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