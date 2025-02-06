import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import img from '../../assets/homeScreen.png'

const CourseDiscountCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.discountText}>50% off</Text>
          <Text style={styles.subText}>take any courses</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={img}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 10, 
  },
  card: {
    width: '90%',
    backgroundColor: '#2D2C7E', // Deep blue background color
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'hidden', // Ensure the container clips the content
  },
  textContainer: {
    flex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FF7F00', // Orange button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    top: -46, 
    right: 10, 
    width: 216,
    height: 193,
    resizeMode: 'contain',
    zIndex: 2, 
  },
});

export default CourseDiscountCard;
