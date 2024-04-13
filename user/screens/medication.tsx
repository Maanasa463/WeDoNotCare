import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles, theme } from '../stylesheet';
import { PermissionsAndroid, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

type MedicationScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Medication'>;
};

const MedicationScreen: React.FC<MedicationScreenProps> = ({ navigation }) => {
  const [medications, setMedications] = useState<{ name: string, time: Date }[]>([]);
  const [appointments, setAppointments] = useState<{ date: Date, time: Date }[]>([]);
  const [medicationName, setMedicationName] = useState<string>('');
  const [medicationTime, setMedicationTime] = useState<Date | null>(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isAppointmentTimePickerVisible, setAppointmentTimePickerVisible] = useState<boolean>(false);
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

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
    const wavFileUri = `${FileSystem.documentDirectory}recording.wav`;
    await FileSystem.copyAsync({ from: uri, to: wavFileUri });
  }

  const handleMedicationEntry = () => {
    if (medicationName && medicationTime) {
      setMedications([...medications, { name: medicationName, time: medicationTime }]);
      setMedicationName('');
      setMedicationTime(null);
    }
  };

  const handleAppointmentEntry = () => {
    if (appointmentDate && appointmentTime) {
      setAppointments([...appointments, { date: appointmentDate, time: appointmentTime }]);
      setAppointmentDate(null);
      setAppointmentTime(null);
    }
  };

  const handleTimeConfirm = (time: Date) => {
    setMedicationTime(time);
    setTimePickerVisible(false);
  };

  const handleDateConfirm = (date: Date) => {
    setAppointmentDate(date);
    setDatePickerVisible(false);
  };

  const handleAppointmentTimeConfirm = (time: Date) => {
    setAppointmentTime(time);
    setAppointmentTimePickerVisible(false);
  };

  return (
    <PaperProvider>
      <View style={{ marginBottom: 300, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder="Enter medication name"
          value={medicationName}
          onChangeText={(text) => setMedicationName(text)}
        />
        <Button title="Select Medication Time" onPress={() => setTimePickerVisible(true)} style={styles.container} />
        {medicationTime && <Text>{`${medicationName}: ${medicationTime.toLocaleTimeString()}`}</Text>}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisible(false)}
        />

        <Button title="Save Medication" onPress={handleMedicationEntry} />

        {/* Display logged medications */}
        {medications.map((medication, index) => (
          <Text key={index}>{`${medication.name}: ${medication.time.toLocaleTimeString()}`}</Text>
        ))}

        <TextInput
          placeholder="Enter appointment date"
          value={appointmentDate ? appointmentDate.toDateString() : ''}
          onFocus={() => setDatePickerVisible(true)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />

        <Button title="Select Appointment Time" onPress={() => setAppointmentTimePickerVisible(true)} />

        {appointmentTime && <Text>{`Appointment Time: ${appointmentTime.toLocaleTimeString()}`}</Text>}
        <DateTimePickerModal
          isVisible={isAppointmentTimePickerVisible}
          mode="time"
          onConfirm={handleAppointmentTimeConfirm}
          onCancel={() => setAppointmentTimePickerVisible(false)}
        />
        <Button
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}
        />


        <Button title="Save Appointment" onPress={handleAppointmentEntry} />

        {/* Display logged appointments */}
        {appointments.map((appointment, index) => (
          <Text key={index}>{`${appointment.date.toDateString()}: ${appointment.time.toLocaleTimeString()}`}</Text>
        ))}


      </View>
    </PaperProvider>
  );
};

export default MedicationScreen;
