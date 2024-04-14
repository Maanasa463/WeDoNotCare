import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../stylesheet';

const Stack = createNativeStackNavigator();

// Define the VitalsScreenProps type
type VitalsScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Vitals'>;
};

interface VitalsEntry {
  id: string;
  type: string;
  value: string;
}

const VitalsScreen: React.FC<VitalsScreenProps> = ({ navigation }) => {
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
    <PaperProvider theme={theme}>
      <View style={styles.container}>
      {/* <Text style={styles.dateTime, color: "#805a9c"}>{getCurrentDateTime()}</Text> */}
      <Text style={[styles.dateTime, {fontSize: 30, color: "#805a9c"}]}>{getCurrentDateTime()}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <Button onPress={handleWeightEntry}>Confirm</Button>

        <TextInput
          style={styles.input}
          placeholder="Enter blood pressure"
          value={bloodPressure}
          onChangeText={(text) => setBloodPressure(text)}
        />
        <Button onPress={handleBloodPressureEntry}>Confirm</Button>

        <TextInput
          style={styles.input}
          placeholder="Enter glucose level"
          value={glucoseLevel}
          onChangeText={(text) => setGlucoseLevel(text)}
        />
        <Button onPress={handleGlucoseLevelEntry}>Confirm</Button>


        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Type</Text>
            <Text style={styles.headerCell}>Value</Text>
            <Text style={styles.headerCell}>Actions</Text>
          </View>

          {vitalsEntries.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.cell}>{item.type}</Text>
              <Text style={styles.cell}>{item.value}</Text>
              <View style={styles.actions}>
                <Button onPress={() => handleEdit(item.id)}>Edit</Button>
                <Button onPress={() => handleDelete(item.id)}>Delete</Button>
              </View>
            </View>
          ))}
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end', // Align content at the bottom
  },
  dateTime: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    marginBottom: 8,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd', // Border color
    borderRadius: 5,
    marginBottom: 16, // Add some margin between the table and other elements
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0', // Header background color
    paddingVertical: 8, // Adjust vertical padding
    paddingHorizontal: 4, // Adjust horizontal padding
    borderBottomWidth: 1, // Add bottom border to header
    borderBottomColor: '#ddd', // Border color
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Border color
    padding: 8,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center', // Align text within the cell
    fontWeight: 'bold',
    borderRightWidth: 1, // Add right border to header cell
    borderRightColor: '#ddd', // Border color
  },
  cell: {
    flex: 1,
    textAlign: 'center', // Align text within the cell

  },
  actions: {
    flexDirection: 'row',
  },
});

export default VitalsScreen;