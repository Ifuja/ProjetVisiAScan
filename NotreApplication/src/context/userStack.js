import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import UserScreen from '../screens/userScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name='User' component={UserScreen} />
      </Stack.Navigator>
  );
}