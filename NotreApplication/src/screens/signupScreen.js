import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/formButton';
import FormInput from '../components/formInput';
import Loading from '../components/loading';
import { AuthContext } from '../context/authProvider';

export default function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
          source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
          style={styles.backgroundImage}>
          <View style={styles.buttonContainer}>
            <Title style={styles.titleText}>Let's get started!</Title>
            <FormInput
              labelName='Display Name'
              value={displayName}
              autoCapitalize='none'
              onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
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
              title='Sign up'
              modeValue='contained'
              labelStyle={styles.loginButtonLabel}
              buttonColor='#5CA9CB'
              onPress={() => register(displayName, email, password)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD700',
    flex: 1,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
  },
  loginButtonLabel: {
    fontSize: 21,
    color:'black'
  },
  navButtonText: {
    fontSize: 18
  },
  navButton: {
    marginTop: 16
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