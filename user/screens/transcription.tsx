// File: src/screens/TranscriptionScreen/index.tsx
import React from 'react';
import {Alert, View, Text } from 'react-native';
import Button from '../components/Button';
import {createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

// Define the DashboardScreenProps type
type TransScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Trans'>;
};


const TranscriptionScreen: React.FC <TransScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Transcription Screen</Text>
      <Button title = "Start" onPress={() => Alert.alert('Starting Transcription')}/>
      <Button title = "Stop" onPress={() => Alert.alert('Stopping Transcription')} />
    </View>
  );
};

export default TranscriptionScreen;
