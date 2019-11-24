/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screens from './navigation/Screens';
import SplashScreen from 'react-native-splash-screen';
import { Container } from 'native-base';


export default class App extends PureComponent {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    console.log("app.js");
    SplashScreen.hide();
  }

  render() {
    console.log("start");
    return (
      <Container>
        <Screens />
      </Container>
    );
  }
}
