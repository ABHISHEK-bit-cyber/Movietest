import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './Style';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.newsText}>NEWS</Text>
    </View>
  );
};

export default Splash;
