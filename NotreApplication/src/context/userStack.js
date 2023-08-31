import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import UserScreen from '../screens/userScreen';
import UserList from '../screens/userList';
import DatabaseScreen from '../screens/databaseScreen';
import LoginScreen from '../screens/loginScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
      <Stack.Navigator initialRouteName='Users' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Users' component={UserScreen} />
        <Stack.Screen name='UsersList' component={UserList} />
        <Stack.Screen name='Database' component={DatabaseScreen} />
      </Stack.Navigator>
  );
}