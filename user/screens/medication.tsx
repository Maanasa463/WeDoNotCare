import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ToastAndroid, Alert } from 'react-native';
import { Provider as PaperProvider, Button, Divider } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles, theme } from '../stylesheet';
import { PermissionsAndroid, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
// import { exec } from 'child_process';
// import * as WebBrowser from 'expo-web-browser';
// import CameraRoll from '@react-native-community/cameraroll';


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
  
  const handleMedicationEntry = () => {
    if (medicationName && medicationTime) {
      setMedications([...medications, { name: medicationName, time: medicationTime }]);
      setMedicationName('');
      setMedicationTime(null);
  
      const currentTime = new Date();
      const timeDiff = medicationTime.getTime() - currentTime.getTime();
    
      // Set a timeout for the alert
      setTimeout(() => {
        // Alert the user to take their meds
        Alert.alert(
          "REMINDER",
          "PLEASE TAKE " + medicationName +  " NOW!",
          [
            {
              text: "OK",
              onPress: () => console.log("Medication alert acknowledged")
            }
          ]
        );
      }, timeDiff);
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <TextInput
          placeholder="Enter medication name"
          value={medicationName}
          onChangeText={(text) => setMedicationName(text)}
        />
    <Button
        mode='contained'
        onPress={() => setTimePickerVisible(true)}
        style={{ marginVertical: 10, width: '70%', backgroundColor:'#bd9ad6' }} // Apply styles for consistent size and vertical margin
    >
       Select Medication Time
    </Button>
    {medicationTime && <Text>{`${medicationName}: ${medicationTime.toLocaleTimeString()}`}</Text>}
    <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
    />

    <Button
mode='contained'
        onPress={handleMedicationEntry}
        style={{ marginVertical: 10, width: '50%', backgroundColor:'#bd9ad6' }} // Apply styles for consistent size and vertical margin
    >Save Medication </Button>

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

    <Button
mode='contained'
        onPress={() => setAppointmentTimePickerVisible(true)}
        style={{marginVertical: 10, width: '70%', backgroundColor:'#bd9ad6'}} // Apply styles for consistent size and vertical
    >Select Appointment Time </Button>

    {appointmentTime && <Text>{`Appointment Time: ${appointmentTime.toLocaleTimeString()}`}</Text>}
    <DateTimePickerModal
        isVisible={isAppointmentTimePickerVisible}
        mode="time"
        onConfirm={handleAppointmentTimeConfirm}
        onCancel={() => setAppointmentTimePickerVisible(false)}
    />

    <Button
mode='contained'
        onPress={handleAppointmentEntry}
        style={{ marginVertical: 10, width: '50%', backgroundColor:'#bd9ad6'}} // Apply styles for consistent size and vertical margin
    >Save Appointment </Button>
    {/* Display logged appointments */}
    {appointments.map((appointment, index) => (
        <Text key={index}>{`${appointment.date.toDateString()}: ${appointment.time.toLocaleTimeString()}`}</Text>
    ))}


</View>

    </PaperProvider>
  );
};

export default MedicationScreen;