// File: src/screens/TranscriptionScreen/index.tsx
import React, {useEffect, useState} from 'react';
import {Alert, View, Text } from 'react-native';
// import Button from '../components/Button';
import {createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { PermissionsAndroid, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import {IconButton, Button} from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Button } from '@mui/material';
// import { Mic, MicNone } from '@mui/icons-material';

const Stack = createNativeStackNavigator();

// Define the DashboardScreenProps type
type TransScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Trans'>;
};

const TranscriptionScreen: React.FC <TransScreenProps> = ({navigation}) => {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [displayText, setDisplayText] = useState('');

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    const fileName = `recording-${Date.now()}.caf`;

    // Move the recording to the new directory with the new file name
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
    await FileSystem.moveAsync({
      from: uri,
      to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
    });

    // This is for simply playing the sound back
    // const playbackObject = new Audio.Sound();
    // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
    // await playbackObject.playAsync();

    // await sendAudioToBackend(uri);


  }

  // const sendAudioToBackend = async (uri) => {
  //   const formData = new FormData();
  //   formData.append('audio', {
  //     uri,
  //     name: 'recording.wav',
  //     type: 'audio/wav',
  //   });
  
  //   try {
  //     const response = await fetch('http://localhost:5000/recognize_speech', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     const responseData = await response.json();
  //     console.log('Response from backend:', responseData);
  //   } catch (error) {
  //     console.error('Error sending audio to backend', error);
  //   }
  // };

  const showText = () => {
    setDisplayText('hello the patient is feeling very sick')
  }

  return (
    <View  style = {{alignItems: 'center', justifyContent:'center', marginTop: 200}}>

    <IconButton
      icon="microphone"
      
      mode="contained"
      onPress={recording ? stopRecording : startRecording}
      size={150}
      iconColor='white'
      style={{
        borderRadius: 100,  // makes the button round
        width: 200,         // sets the width
        height: 200,        // sets the height
        justifyContent: 'center', // centers the content vertically
        alignItems: 'center',     // centers the content horizontally
        // colour: 'blaeck'
        backgroundColor: recording ? 'red' : 'green',
        marginBottom:50
      }}
      ></IconButton>

    <Button
      mode="contained"
      // title={displayText}
      onPress={showText}
      style={{
        borderRadius: 100,
        // backgroundColor:
      }}
      labelStyle={{
        fontSize: 20, // increase the font size
        fontWeight: 'bold' // make the font bold if desired
      }}
      >
      {/* {recording ? 'Show Transcription' : 'Start Recording'} */}
      Show Transcription

      
    </Button>
    <Text>{displayText}</Text>
    </View>
  );
};

export default TranscriptionScreen;
