import React, { useContext, useState, useEffect } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { AuthContext } from '../context/authProvider';
import { auth } from '../firebase';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import FormButton from '../components/formButton.js';
import FormInput from '../components/formInput.js';
//import SocialButton from '../components/socialButton.js';

export default function LoginScreen({ navigation }) {
  const [ email, setEmail ] = useState('');
  const [ user, setUser ] = useState();
  const [ password, setPassword ] = useState('');
  const { login, loginWithGoogle, logout, logoutWithGoogle } = useContext(AuthContext);
  const [ initializing, setInitializing ] = useState(true);
  
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

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
        sendNotification('Bienvenue !', 'Vous êtes connecté avec succès.');
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

    if (requestUserPermission()){
      // return fcm token from the device
      messaging().getToken().then(token => {
          console.log(token);
      });
    }
    else {
      console.log("Failed token status", authStatus);
    }

    //Check weather an initial notification is available
    messaging()
      .getInitialNotification()
      .then( async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // Naviguer vers la vue "Porte" 
          //navigation.navigate('Chat');
        }
    });

    // Assume a message-notification contains a "type" property in the data payload
    messaging().onNotificationOpenedApp( async (remoteMessage) => {
      navigation.navigate('Chat');
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Alert message arrived on my app
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return () => {
      // Vous pouvez ajouter d'autres nettoyages ici si nécessaire.
      subscriber(); // Assurez-vous d'appeler la fonction renvoyée par `onAuthStateChanged`.
      unsubscribe(); // Assurez-vous d'appeler la fonction renvoyée par `onMessage`.
    };

  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
          style={styles.backgroundImage}>
          <View style={styles.buttonContainer}>
            <Image
              source={require('../../assets/logo_app.png')}
              style={styles.media}
            />
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
              title='Sign in'
              modeValue='contained'
              labelStyle={styles.loginButtonLabel}
              buttonColor='#5CA9CB'
              onPress={handleLogin} // Appel la fonction handleLogin lors du clic sur le bouton
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
            <IconButton
              icon='keyboard-backspace'
              size={30}
              style={styles.navButton}
              iconColor='white'
              onPress={() => navigation.goBack()}
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
          <View style={{ flex: 1 }} />
          <Image
            source={{uri: user.photoURL }}
            style={styles.media}
          />
          <Title style={styles.titleText}>VisiaScan Menu</Title>
          <FormButton
            title='Users'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => {
            navigation.navigate('Users');
            }} 
          />
          <FormButton
            title='Pictures'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => {
            navigation.navigate('Call');
            }}
          />
          <FormButton
            title='Token'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => {
            navigation.navigate('Notification');
            }}
          />
          <View style={{ flex: 1 }} />
          <FormButton
            title='Sign Out'
            labelStyle={styles.navButtonText}
            modeValue='contained'
            buttonColor='#CC6666'
            onPress={() => {
              logoutWithGoogle();
              logout();
            }}
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
  media: {
    width: '30%',
    height: '20%',
    borderRadius: 150,
    marginBottom: 40
  }
});