import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/formButton.js';
import FormInput from '../components/formInput.js';
import { AuthContext } from '../context/authProvider';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(AuthContext);
  //const { loginWithGoogle } = useContext(AuthContext);

  /*GoogleSignin.configure({
    webClientId: '922703610991-0fvd4dd344dhehfn8qp50b8go5c23c3j.apps.googleusercontent.com', // Remplacez par votre web client ID
  });*/

  /*** Connexion avec un compte Google ***/
  /*const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };*/
  
  /*** Connexion avec un compte personnalisé ***/
  const handleLogin = async () => {
    try {
      // Appel la fonction de connexion avec l'email et le mot de passe saisis
      const loggedInUser = await login(email, password);
      // Une fois que la connexion est réussie et l'utilisateur est redirigé,
      // la valeur "user" dans le contexte devrait être mise à jour, indiquant que l'utilisateur est connecté
      if (loggedInUser) {
        navigation.navigate('Users'); // Redirige vers la page des utilisateurs
      }
    } catch (error) {
      // Gére les erreurs de connexion ici
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to VisiaScan!</Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormButton
        title='Login'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#8A4D76'
        onPress={handleLogin} // Appel la fonction handleLogin lors du clic sur le bouton
      />
      <FormButton
        title='Google'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#4764A9'
        onPress={handleLogin}
      />
      <FormButton
        title='Call'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#DD4D44'
        onPress={() => {
          navigation.navigate('Call')}
        }
      />
      <FormButton
        title='Notification'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#363636'
        onPress={() => {
          navigation.navigate('Notification')}
        }
      />
      <FormButton
        title='Sign up here'
        modeValue='text'
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => 
          navigation.navigate('Signup')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD700',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 20
  },
  navButtonText: {
    fontSize: 16
  }
});