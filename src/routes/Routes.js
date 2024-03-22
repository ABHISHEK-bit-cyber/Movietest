import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';
import Home from '../screens/Home/Home';
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
const Routes = () => {
  const Stack = createNativeStackNavigator();
  const options = { headerShown: false };
  
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splash} options={options}/>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Routes;
