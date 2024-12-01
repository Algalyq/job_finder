
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';


export default function HeaderComponentHomeScreen() {
    return (

        <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello</Text>
          <Text style={styles.username}>Orlando Diggs.</Text>
        </View>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Replace with the actual profile image URL
          style={styles.profileImage}
        />
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    greeting: {
        fontSize: 18,
        color: '#222',
      },
      username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
      }

});