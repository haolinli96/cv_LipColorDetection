/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
console.disableYellowBox = true;


const Home = ({ navigation }) => {
  const pressCamera = () => {
    navigation.navigate('Camera')
  };
  const pressRoll = () => {
    navigation.navigate('Roll')
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button large iconLeft rounded info onPress={pressCamera}>
        <Icon name="camera" />
        <Text>Camera</Text>
      </Button>
      <Button transparent>
        <Text> </Text>
      </Button>
      <Button large iconLeft rounded info onPress={pressRoll}>
        <Icon type="FontAwesome" name="photo" />
        <Text>Photo Library</Text>
      </Button>
    </View>
  );

};



export default Home;

