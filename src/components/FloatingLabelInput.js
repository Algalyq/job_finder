import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';

const FloatingLabelInput = ({ placeholder,setTitle,value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const animatedLabel = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (text.length === 0) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (value) {
      console.log("Value: ", value);
      handleFocus();
      setText(value);
    }
  }, [value]);  // Runs when value changes


  const handleTextChange = (newText) => {
    setText(newText);
    setTitle(newText); // Update the parent's title state
  };

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8], // Adjust these values for spacing
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // Font size change on focus
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ['gray', 'black'],
    }),
    backgroundColor: 'white', // Ensures label background hides input border
    paddingHorizontal: 4, // Adds padding around label text
    zIndex: 1, // Makes sure label is on top of the input
  };
  
  

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>{placeholder}</Animated.Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 52,
    borderColor: '#ccc',
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignContent: 'center'
  },
  
});

export default FloatingLabelInput;