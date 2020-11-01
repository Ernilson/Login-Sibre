import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './src/pages/login';
import Home from './src/pages/Home';

const AppNavigator = createSwitchNavigator({
   Home:Home,
   Login:Login
},
  {
    initialRouteName: 'Home'
  }
)

export default createAppContainer(AppNavigator);