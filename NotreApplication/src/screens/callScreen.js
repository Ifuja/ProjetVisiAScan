import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import FormButton from '../components/formButton.js';

export default function CallScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>   
          <Title style={styles.titleText}>VisIAscan Storage</Title>
          <FormButton
            title='Pictures'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => {
              navigation.navigate('Storage')}
            }
          />
          <FormButton
            title='Movies'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => {
              navigation.navigate('Video')}
            }
          />
          <IconButton
            icon='keyboard-backspace'
            size={30}
            style={styles.navButton}
            iconColor='#F2F2F2'
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButtonLabel: {
    fontSize: 19,
    color:'black'
  },
  navButton: {
    marginTop: 16,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
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
