import React from 'react';
import { View,Text } from 'react-native';
import {NavigationContainer, } from '@react-navigation/native'
// import {IconButton, Button} from 'react-native-paper'

import {createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import {styles,theme} from '../stylesheet';
import {
  Card,
  Title,
  Button,
  Paragraph,
  List,
  PaperProvider,
  IconButton
} from 'react-native-paper';


// Define the DashboardScreenProps type
type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Dashboard'>;
};


const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
        <Text style={{fontWeight:'bold', fontSize:25, color:'purple', marginLeft:75, marginTop:30}}>Welcome Back :D</Text>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
        {/* Left side */}
        <View style={{ flex: 1, marginLeft:8}}>
          <IconButton
            icon="microphone"
            mode="contained"
            onPress={() => navigation.navigate('Transcription')}
            // onPress={recording ? stopRecording : startRecording}
            size={150}
            iconColor='white'
            style={{
              borderRadius: 0,  // makes the button round
              // width: 200,         // sets the width
              // height: 200,        // sets the height
              justifyContent: 'center', // centers the content vertically
              alignItems: 'center',     // centers the content horizontally
              // colour: 'blaeck'
              backgroundColor: '#bd9ad6',
              marginBottom:50
            }}
            ></IconButton>
            
          <IconButton
            icon="heart-pulse"
            
            mode="contained"
            onPress={() => navigation.navigate('Vitals')}
            // onPress={recording ? stopRecording : startRecording}
            size={150}
            iconColor='white'
            style={{
              borderRadius: 0,  // makes the button round
              // width: 200,         // sets the width
              // height: 200,        // sets the height
              justifyContent: 'center', // centers the content vertically
              alignItems: 'center',     // centers the content horizontally
              // colour: 'blaeck'
              backgroundColor: '#bd9ad6',
              marginBottom:50
            }}
            ></IconButton>
        </View>

        {/* Right side */}
        <View style={{ flex: 1 }}>

        <IconButton
            icon="puzzle"
            
            mode="contained"
            onPress={() => navigation.navigate('Puzzles')}
            // onPress={recording ? stopRecording : startRecording}
            size={150}
            iconColor='white'
            style={{
              borderRadius: 0,  // makes the button round
              // width: 200,         // sets the width
              // height: 200,        // sets the height
              justifyContent: 'center', // centers the content vertically
              alignItems: 'center',     // centers the content horizontally
              // colour: 'blaeck'
              backgroundColor: '#bd9ad6',
              marginBottom:50
            }}
            ></IconButton>

        <IconButton
            icon="timer"
            
            mode="contained"
            onPress={() => navigation.navigate('Medication')}
            // onPress={recording ? stopRecording : startRecording}
            size={150}
            iconColor='white'
            style={{
              borderRadius: 0,  // makes the button round
              // width: 200,         // sets the width
              // height: 200,        // sets the height
              justifyContent: 'center', // centers the content vertically
              alignItems: 'center',     // centers the content horizontally
              // colour: 'blaeck'
              backgroundColor: '#bd9ad6',
              marginBottom:50
            }}
            ></IconButton>
        </View>
      </View>
    </PaperProvider>
  );
};

export default DashboardScreen;