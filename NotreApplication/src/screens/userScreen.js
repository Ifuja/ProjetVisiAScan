import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/formButton';

export default function UserScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>VisIAscan Users</Title>
      <FormButton
        title='List'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#8A4D76'
        onPress={() => navigation.navigate('UsersList')}
      />
      <FormButton
        title='Database'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        buttonColor='#007BFF'
        onPress={() => {
          navigation.navigate('Database')}
        }
      />
      <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        iconColor='#5b3a70'
        onPress={() => 
          navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 18
  },
  navButton: {
    marginTop: 10
  }
});