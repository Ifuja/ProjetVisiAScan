import React from 'react';
import { ImageBackground, StyleSheet, View, Image, BackHandler } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/formButton';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    BackHandler.exitApp(); // Cette ligne ferme l'application lorsque le bouton "Logout" est appuyé
  };
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
          <Title style={styles.titleText}>Welcome to VisiaScan!</Title>
          <FormButton 
            modeValue='contained' 
            title='Access the application' 
            labelStyle={styles.loginButtonLabel}
            buttonColor='#008080'
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
          <FormButton 
            modeValue='contained' 
            title='Exit the application'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#CC6666'
            onPress={handleLogout}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginButtonLabel: {
    fontSize: 19,
    color:'white'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
  },
  media: {
    width: '60%',
    height: '40%',
    borderRadius: 150,
    marginBottom: 100
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
  }
});