import React, { useState } from 'react';
import { View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {styles,theme} from '../stylesheet';

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
      <View style={{ marginBottom: 450 , flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder="Enter medication name"
          value={medicationName}
          onChangeText={(text) => setMedicationName(text)}
        />
        <Button title="Select Medication Time" onPress={() => setTimePickerVisible(true)} style = {styles.container}/>
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
        <Button title="Start Speech" onPress={_buttonClick} /> 

        {appointmentTime && <Text>{`Appointment Time: ${appointmentTime.toLocaleTimeString()}`}</Text>}
        <DateTimePickerModal
          isVisible={isAppointmentTimePickerVisible}
          mode="time"
          onConfirm={handleAppointmentTimeConfirm}
          onCancel={() => setAppointmentTimePickerVisible(false)}
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
