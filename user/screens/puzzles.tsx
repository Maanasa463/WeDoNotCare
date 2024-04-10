

import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useNavigation,useIsFocused } from '@react-navigation/native';


const PuzzlesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [favColor, setFavColor] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const isFocused = useIsFocused();

  const questions = [
    { question: 'What is your name?', stateUpdater: setName },
    { question: 'How old are you?', stateUpdater: setAge },
    { question: 'What is your favorite color?', stateUpdater: setFavColor },
  ];

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All questions asked, navigate to the next screen or perform any other action
      Alert.alert("Good job grandpa lets go to bed");
      navigation.navigate('Dashboard');
      // <HomeButton onPress={() => navigation.navigate('Dashboard')} />
    }
  };

  useEffect(() => {
    if (isFocused) {
      setName('');
      setAge('');
      setFavColor('');
      setCurrentStep(0);
    }
  }, [isFocused]);

  return (
    <View>
      <Text>Puzzles Screen</Text>
      {currentStep < questions.length && (
        <View>
          <Text>{questions[currentStep].question}</Text>
          <TextInput
            placeholder='Answer'
            value={currentStep === 0 ? name : currentStep === 1 ? age : favColor}
            onChangeText={(text) => questions[currentStep].stateUpdater(text)}
          />
          <Button title="Next" onPress={handleNextStep} />
        </View>
      )}
    </View>
  );
};

export default PuzzlesScreen;