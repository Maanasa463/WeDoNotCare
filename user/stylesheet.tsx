import { StyleSheet} from 'react-native';
import {
    MD3LightTheme as DefaultTheme,
  } from 'react-native-paper';
const styles = StyleSheet.create({
    container: {
      margin:5,
    },
    top: {
      flex: 0.3,
      backgroundColor: 'grey',
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    middle: {
      flex: 0.3,
      backgroundColor: 'beige',
      borderWidth: 5,
    },
    bottom: {
      flex: 0.3,
      backgroundColor: 'pink',
      borderWidth: 5,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  });
  const theme =  {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "red",
      secondary: "yellow",
      background: "white",
      surface: "white",
    },
  };
  export { styles, theme };