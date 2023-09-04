import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import CallScreen from '../screens/callScreen';
import StorageScreen from '../screens/storageScreen';
import VideoScreen from '../screens/videoScreen';
import NotificationScreen from '../screens/notificationScreen';
import LoggedInView from '../screens/loggedInView';
import UserScreen from '../screens/userScreen';
import DatabaseScreen from '../screens/databaseScreen';
import UserList from '../screens/userList';

const Stack = createStackNavigator();

export default function AuthStack() {

  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='LoggedInView' component={LoggedInView} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='Call' component={CallScreen} />
      <Stack.Screen name='Storage' component={StorageScreen} />
      <Stack.Screen name='Video' component={VideoScreen} />
      <Stack.Screen name='Users' component={UserScreen} />
      <Stack.Screen name='UsersList' component={UserList} />
      <Stack.Screen name='Notification' component={NotificationScreen} />
      <Stack.Screen name='Database' component={DatabaseScreen} />
    </Stack.Navigator>
  );
}