import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/loginScreen';
import StorageScreen from '../screens/storageScreen';
import VideoScreen from '../screens/videoScreen';
import CallScreen from '../screens/callScreen';

const Stack = createStackNavigator();

export default function CallStack() {
  return (
      <Stack.Navigator initialRouteName='Call' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Call' component={CallScreen} />
        <Stack.Screen name='Storage' component={StorageScreen} />
        <Stack.Screen name='Video' component={VideoScreen} />
      </Stack.Navigator>
  );
}