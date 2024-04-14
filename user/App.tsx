// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screens/dashboard'; // Page 0
import VitalsScreen from './screens/vitals'; // Page 1
import PuzzlesScreen from './screens/puzzles'; // Page 2
import TranscriptionScreen from './screens/transcription'; // Page 3
// import MedicationScreen from './screens/medication';
import Puzzles from './screens/puzzles'; // Page 4
import {
  Card,
  Title,
  Paragraph,
  List,
  DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import MedicationScreen from './screens/medication';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
// App component
const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>

        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="home-plus" size={30} color={"blue"} />;
              },
            }}
          />
          <Tab.Screen
            name="Vitals"
            component={VitalsScreen}
            options={{
              tabBarLabel: 'Vitals',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="heart-pulse" size={30} color={"blue"} />;
              },
            }}
          />
          <Tab.Screen
            name="Puzzles"
            component={Puzzles}
            options={{
              tabBarLabel: 'Puzzles',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="puzzle" size={30} color={"blue"} />;
              },
            }}
          />
          <Tab.Screen
            name="Transcription"
            component={TranscriptionScreen}
            options={{
              tabBarLabel: 'Transcription',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="microphone" size={30} color={"blue"} />;
              },
            }}
          />
          
          <Tab.Screen 
            name="Medication" 
            component={MedicationScreen} 
            options={{
              tabBarLabel: 'Medication',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="timer" size={30} color={"blue"} />;
              },
            }}
            />
          
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
