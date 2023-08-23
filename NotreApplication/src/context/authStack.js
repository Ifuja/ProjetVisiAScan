import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import UserScreen from '../screens/userScreen';
import UserList from '../screens/userList';
import CallScreen from '../screens/callScreen';
import StorageScreen from '../screens/storageScreen';

const Stack = createStackNavigator();

export default function AuthStack() { 
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='User' component={UserScreen} />
      <Stack.Screen name='UserList' component={UserList} />
      <Stack.Screen name='Call' component={CallScreen} />
      <Stack.Screen name='Storage' component={StorageScreen} />
    </Stack.Navigator>
  );
}