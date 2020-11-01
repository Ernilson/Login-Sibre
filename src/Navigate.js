import React from 'react';
import login from '../src/pages/login';
import cadastro from '../src/pages/cadastro';
import Home from '../src/pages/Home';
import Pedidos from '../src/pages/Pedidos';
import Cantina from '../src/pages/Cantina';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="cadastro" component={cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="Cantina" component={Cantina} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
