import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AuthStack from './authStack';
import UserStack from './userStack'; // Import de UserStack

export default function Routes({ user }) {
  return (
    <NavigationContainer>
      {/*Si l'utilisateur est connecté, naviguez vers UserStack, sinon vers AuthStack*/}
      {user ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}