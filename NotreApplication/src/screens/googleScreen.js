/*import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../components/formButton.js';
import { auth } from '../firebase/index.js';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

export default function GoogleScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ login ] = useContext(AuthContext);
  const [ initializing, setInitializing ] = useState(true);
  const [ user, setUser ] = useState();

  GoogleSignin.configure({
    webClientId: '922703610991-0fvd4dd344dhehfn8qp50b8go5c23c3j.apps.googleusercontent.com', // Remplacez par votre web client ID
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async() => {
    // Get the users ID Token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth.signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  if (initializing) return null;

  if (!user) {
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      onPress={onGoogleButtonPress}
      color={GoogleSigninButton.Color.Dark}
    />
  }

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome to VisiaScan!</Title>
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
        title='Sign Out'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='grey'
        onPress={signOut}
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
});*/