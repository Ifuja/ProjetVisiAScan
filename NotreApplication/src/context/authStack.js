import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signUpScreen';
import CallScreen from '../screens/callScreen';
import StorageScreen from '../screens/storageScreen';
import VideoScreen from '../screens/videoScreen';
import NotificationScreen from '../screens/notificationScreen';

const Stack = createStackNavigator();

export default function AuthStack() { 
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='Call' component={CallScreen} />
      <Stack.Screen name='Storage' component={StorageScreen} />
      <Stack.Screen name='Video' component={VideoScreen} />
      <Stack.Screen name='Notification' component={NotificationScreen} />
    </Stack.Navigator>
  );
}