import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';

export default function App() {
  return (
  <SafeAreaView style={styles.container}>
    <SignInScreen/>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
