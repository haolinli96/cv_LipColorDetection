/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screens from './navigation/Screens';
import SplashScreen from 'react-native-splash-screen';
import { Container } from 'native-base';
import firebase from '@react-native-firebase/app';

/* const iosConfig = {
  clientId: '1000635454383-hjtc4rdvp0nsjuokmqk6d7rbsa1n5nuk.apps.googleusercontent.com',
  appId: '1:1000635454383:ios:c6a67c463f9d1e70ae555a',
  apiKey: 'AIzaSyClL6flG5s8Yd6_J5gDr9jlGhYcWJEPcC8',
  databaseURL: 'https://camera-798b0.firebaseio.com',
  storageBucket: 'camera-798b0.appspot.com',
  messagingSenderId: '1000635454383',
  projectId: 'camera-798b0',

  // enable persistence by adding the below flag
  persistence: true,
};

const firebaseApp = firebase.initializeApp(
    iosConfig, 'camera',
  )
  .then(app => console.log('initialized apps ->', firebase.apps));
 */
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
