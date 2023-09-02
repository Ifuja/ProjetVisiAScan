import React, { useContext } from 'react';
import { Title } from 'react-native-paper';
import { AuthContext } from '../context/authProvider';
import { StyleSheet, View } from 'react-native';

import FormButton from '../components/formButton';

export default function LoggedInView({ navigation }) {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
        <Title style={styles.titleText}>Welcome to VisiaScan!</Title>
        <FormButton
            title='Users'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='green'
            onPress={() => {
            navigation.navigate('Users');
            }} 
        />
        <FormButton
            title='Call'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#DD4D44'
            onPress={() => {
            navigation.navigate('Call');
            }}
        />
        <FormButton
            title='Notification'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#363636'
            onPress={() => {
            navigation.navigate('Notification');
            }}
        />
        <FormButton
            title='Sign Out'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='grey'
            onPress={() => logout()}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD700',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 20,
  },
  navButtonText: {
    fontSize: 16,
  },
});
