

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Button = ({ screen,job }) => { // Accept job as a prop
    const navigation = useNavigation();
  return (
<TouchableOpacity style={styles.applyButton}  
onPress={() => navigation.navigate(screen,{job})}>
  <Text style={styles.applyText}>APPLY NOW 2</Text>
</TouchableOpacity>

  );
};

const styles = StyleSheet.create({
    applyButton: {
        backgroundColor: '#130160',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        // marginTop: 16,
      },
      applyText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default Button;
