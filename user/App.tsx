// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './screens/dashboard'; // Page 0
import VitalsScreen from './screens/vitals'; // Page 1
import PuzzlesScreen from './screens/puzzles'; // Page 2
import TranscriptionScreen from './screens/transcription'; // Page 3
import {
  Card,
  Title,
  Paragraph,
  List,
  DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
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
    <PaperProvider theme = {theme}>
    <NavigationContainer>
      {/* Bottom tab navigator for the main screens */}
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Vitals" component={VitalsScreen} />
        <Tab.Screen name="Puzzles" component={PuzzlesScreen} />
        <Tab.Screen name="Transcription" component={TranscriptionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
