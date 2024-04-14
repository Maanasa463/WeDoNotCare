// File: src/components/Button.tsx
import React from 'react';
import {View} from 'react-native'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  // icon: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      {/* {icon} */}
      {/* <View style={styles.iconContainer}>{icon}</View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconContainer: {
    marginRight: 10, // Spacing between icon and text
  },
});

export default Button;
