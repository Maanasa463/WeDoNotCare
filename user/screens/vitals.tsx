import React, { useState } from 'react';
import {FlatList} from 'react-native'
import {createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text,TextInput, PaperProvider } from 'react-native-paper';
import {styles,theme} from '../stylesheet';
const Stack = createNativeStackNavigator();

// Define the DashboardScreenProps type
type VitalsScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Vitals'>;
};


interface VitalsEntry {
  type: string;
  value: string;
}


interface VitalsEntry {
  id: string;
  type: string;
  value: string;
}

const VitalsScreen: React.FC<VitalsScreenProps> = ({navigation}) => {
  const [weight, setWeight] = useState<string>('');
  const [bloodPressure, setBloodPressure] = useState<string>('');
  const [glucoseLevel, setGlucoseLevel] = useState<string>('');
  const [vitalsEntries, setVitalsEntries] = useState<VitalsEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const getCurrentDateTime = (): string => {
    const now = new Date();
    const date = now.toDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const handleWeightEntry = () => {
    if (weight !== '') {
      if (editingId) {
        const updatedEntries = vitalsEntries.map((entry) =>
          entry.id === editingId ? { ...entry, value: weight } : entry
        );
        setVitalsEntries(updatedEntries);
        setEditingId(null);
      } else {
        setVitalsEntries([...vitalsEntries, { id: Date.now().toString(), type: 'Weight', value: weight }]);
      }
      setWeight('');
    }
  };

  const handleBloodPressureEntry = () => {
    if (bloodPressure !== '') {
      if (editingId) {
        const updatedEntries = vitalsEntries.map((entry) =>
          entry.id === editingId ? { ...entry, value: bloodPressure } : entry
        );
        setVitalsEntries(updatedEntries);
        setEditingId(null);
      } else {
        setVitalsEntries([
          ...vitalsEntries,
          { id: Date.now().toString(), type: 'Blood Pressure', value: bloodPressure },
        ]);
      }
      setBloodPressure('');
    }
  };

  const handleGlucoseLevelEntry = () => {
    if (glucoseLevel !== '') {
      if (editingId) {
        const updatedEntries = vitalsEntries.map((entry) =>
          entry.id === editingId ? { ...entry, value: glucoseLevel } : entry
        );
        setVitalsEntries(updatedEntries);
        setEditingId(null);
      } else {
        setVitalsEntries([...vitalsEntries, { id: Date.now().toString(), type: 'Glucose Level', value: glucoseLevel }]);
      }
      setGlucoseLevel('');
    }
  };

  const handleEdit = (id: string) => {
    const entryToEdit = vitalsEntries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditingId(id);
      // Populate the corresponding input field with the current value for editing
      switch (entryToEdit.type) {
        case 'Weight':
          setWeight(entryToEdit.value);
          break;
        case 'Blood Pressure':
          setBloodPressure(entryToEdit.value);
          break;
        case 'Glucose Level':
          setGlucoseLevel(entryToEdit.value);
          break;
        default:
          break;
      }
    }
  };

  const handleDelete = (id: string) => {
    const updatedEntries = vitalsEntries.filter((entry) => entry.id !== id);
    setVitalsEntries(updatedEntries);
    setEditingId(null);
  };


  return (
    <PaperProvider theme = {theme}>
      <Text>{getCurrentDateTime()}</Text>
      
        <TextInput
          placeholder="Enter weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <Button  onPress={handleWeightEntry} >Confirm</Button>

      
        <TextInput
          placeholder="Enter blood pressure"
          value={bloodPressure}
          onChangeText={(text) => setBloodPressure(text)}
        />
        <Button  onPress={handleBloodPressureEntry} >Confirm</Button>

      
        <TextInput
          placeholder="Enter glucose level"
          value={glucoseLevel}
          onChangeText={(text) => setGlucoseLevel(text)}
        />
        <Button onPress={handleGlucoseLevelEntry} >Confirm</Button>

      <FlatList
        data={vitalsEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <PaperProvider theme = {theme}>
            <Text>{`${item.type}: ${item.value}`}</Text>
            <Button  onPress={() => handleEdit(item.id)} >Edit</Button>
            <Button  onPress={() => handleDelete(item.id)} >Confirm</Button>
        </PaperProvider>
    
        )}
      />
    </PaperProvider>
  );
};

export default VitalsScreen;