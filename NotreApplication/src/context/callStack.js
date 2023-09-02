import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import StorageScreen from '../screens/storageScreen';
import VideoScreen from '../screens/videoScreen';
import CallScreen from '../screens/callScreen';
import UserScreen from '../screens/userScreen';

const Stack = createStackNavigator();

export default function CallStack() {
  return (
      <Stack.Navigator initialRouteName='Call' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Users' component={UserScreen} />
        <Stack.Screen name='Call' component={CallScreen} />
        <Stack.Screen name='Storage' component={StorageScreen} />
        <Stack.Screen name='Video' component={VideoScreen} />
      </Stack.Navigator>
  );
}