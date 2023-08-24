import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FormButton from '../components/formButton.js';

export default function CallScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <FormButton
        title='Pictures'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='grey'
        onPress={() => {
          navigation.navigate('Storage')}
        }
      />
      <FormButton
        title='Movies'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='grey'
        onPress={() => {
          navigation.navigate('Video')}
        }
      />
      <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        iconColor='#5b3a70'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonLabel: {
    fontSize: 19
  },
  navButton: {
    marginTop: 16,
  },
});
