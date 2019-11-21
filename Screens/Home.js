/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'native-base';


const Home = ({ navigation }) => {
  const pressCamera = () => {
    navigation.navigate('Camera')
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button rounded info onPress={pressCamera}>
        <Icon name="camerao" />
        <Text>Camera</Text>
      </Button>
    </View>
  );

};



export default Home;

