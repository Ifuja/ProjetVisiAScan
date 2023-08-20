import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/formButton.js';
import FormInput from '../components/formInput.js';
import { AuthContext } from '../context/authProvider';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth/react-native'; // Importez ces modules
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useContext(AuthContext);
  //const { loginWithGoogle } = useContext(AuthContext);

  /*** Connexion avec un compte Google ***/
  const handleGoogleLogin = async () => {
    try {
      
      // Obtenez les informations d'identification Google
      const credential = GoogleAuthProvider.credential(null, null);

      // Connectez-vous avec les informations d'identification
      const result = await signInWithCredential(auth, credential);
      const user = result.user;

      console.log('Logged in with Google:', user);
      // Mettez à jour votre contexte ou faites d'autres actions nécessaires
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  /*** Connexion avec un compte personnalisé ***/
  const handleLogin = async () => {
    try {
      // Appel la fonction de connexion avec l'email et le mot de passe saisis
      await login(email, password);
      // Une fois que la connexion est réussie et l'utilisateur est redirigé,
      // la valeur "user" dans le contexte devrait être mise à jour, indiquant que l'utilisateur est connecté
      if (user) {
        navigation.navigate('User'); // Redirige vers la page des utilisateurs
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
        title='Facebook'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#007BFF'
        onPress={() => {
          navigation.navigate('User')}
        }
      />
      <FormButton
        title='Google'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#FF0000'
        onPress={handleGoogleLogin}
      />
      <FormButton
        title='Call'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#4CAF50'
        onPress={() => {
          navigation.navigate('Call')}
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