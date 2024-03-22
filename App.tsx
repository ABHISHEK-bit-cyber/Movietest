import React from 'react';
import { SafeAreaView, useColorScheme, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const API_KEY = '1d9149aa15034bf080d4d08b76f67990';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
    <Routes/>
  </NavigationContainer>
  );
}
export default App;
