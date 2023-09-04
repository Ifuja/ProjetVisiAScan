import React, { useEffect } from 'react';
import { Alert, StyleSheet, View, StatusBar, ImageBackground } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { IconButton, Title } from 'react-native-paper';

export default function NotificationScreen({ navigation }) {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
  }

  useEffect(() => {
    // Demander la permission pour les notifications
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
        }
    });

    // Assume a message-notification contains a "type" property in the data payload
    messaging().onNotificationOpenedApp( async (remoteMessage) => {
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

    return unsubscribe;

  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>
          <Title style={styles.titleText}>VisIAscan Notification</Title>
          <StatusBar style='auto' />
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
    flex: 1,
    justifyContent:'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
  },
  loginButtonLabel: {
    fontSize: 22
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
