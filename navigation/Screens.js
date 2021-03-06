/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Easing, Animated} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Camera from '../Screens/Camera';
import Home from '../Screens/Home';
import Roll from '../Screens/Roll';
import Detection from '../Screens/Detection';

console.disableYellowBox = true;
const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Camera: {
      screen: Camera,
    },
    Roll: {
      screen: Roll,
    },
    Detection: {
      screen: Detection,
    },
  },
  {
      initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
