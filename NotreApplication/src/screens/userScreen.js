import { StyleSheet, View, ImageBackground} from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/formButton';

export default function UserScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>
          <Title style={styles.titleText}>VisIAscan Users</Title>
          <FormButton
            title='List'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => navigation.navigate('UsersList')}
          />
          <FormButton
            title='Database'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            buttonColor='#5CA9CB'
            onPress={() => {
              navigation.navigate('Database')}
            }
          />
          <IconButton
            icon='keyboard-backspace'
            size={30}
            style={styles.navButton}
            iconColor='white'
            onPress={() => 
              navigation.navigate('Login')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
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
    marginTop: 10
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