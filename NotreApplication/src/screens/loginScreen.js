import React, { useContext, useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../context/authProvider';
import { auth } from '../firebase';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import FormButton from '../components/formButton.js';
import FormInput from '../components/formInput.js';
import SocialButton from '../components/socialButton.js';

export default function LoginScreen({ navigation }) {
  const [ email, setEmail ] = useState('');
  const [ user, setUser ] = useState();
  const [ password, setPassword ] = useState('');
  const { login, loginWithGoogle, logout } = useContext(AuthContext);
  const [ initializing, setInitializing ] = useState(true);

  /*** Connexion avec un compte Google ***/
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const loggedInUserGoogle = await loginWithGoogle();
      if (loggedInUserGoogle) {
        console.log('Etat de la connexion:', loggedInUserGoogle);
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  /*** Connexion avec un compte personnalisé ***/
  const handleLogin = async () => {
    try {
      // Appel la fonction de connexion avec l'email et le mot de passe saisis
      const loggedInUser = await login(email, password);
      // Une fois que la connexion est réussie et l'utilisateur est redirigé
      if (loggedInUser) {
        console.log('Etat de la connexion:', loggedInUser);
      }
    } catch (error) {
      // Gére les erreurs de connexion ici
      console.error('User login error:', error);
    }
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
          style={styles.backgroundImage}>
          <View style={styles.buttonContainer}>
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
              buttonColor='#F5D025'
              onPress={handleLogin} // Appel la fonction handleLogin lors du clic sur le bouton
            />
            <SocialButton 
              buttonTitle="Sign Up with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={handleLogin}
            />
            <SocialButton 
              buttonTitle="Sign Up with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={handleGoogleLogin}
            />
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              style={{ width:285, height:60, marginTop:1, fontSize:20 }}
              onPress={handleGoogleLogin}
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
        </ImageBackground>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>       
          <Title style={styles.titleText}>VisiaScan Menu</Title>
          <FormButton
              title='Users'
              modeValue='contained'
              labelStyle={styles.loginButtonLabel}
              buttonColor='#F5D025'
              onPress={() => {
              navigation.navigate('Users');
              }} 
          />
          <FormButton
              title='Call'
              modeValue='contained'
              labelStyle={styles.loginButtonLabel}
              buttonColor='#F5D025'
              onPress={() => {
              navigation.navigate('Call');
              }}
          />
          <FormButton
              title='Notification'
              modeValue='contained'
              labelStyle={styles.loginButtonLabel}
              buttonColor='#F5D025'
              onPress={() => {
              navigation.navigate('Notification');
              }}
          />
          <FormButton
              title='Sign Out'
              labelStyle={styles.navButtonText}
              uppercase={false}
              modeValue='text'
              onPress={() => logout()}
          />
        </View> 
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
  },
  loginButtonLabel: {
    fontSize: 19,
    color:'black'
  },
  navButtonText: {
    fontSize: 20,
    color: 'white'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Vous pouvez ajuster le mode de redimensionnement selon vos besoins
    justifyContent: 'center', // Vous pouvez ajuster l'alignement vertical selon vos besoins
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', // Centre les boutons horizontalement
    alignItems: 'center', // Centre les boutons verticalement
  },
});