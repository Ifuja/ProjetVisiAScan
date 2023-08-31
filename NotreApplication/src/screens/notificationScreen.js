import React, { useEffect } from 'react';
import { Alert, StyleSheet, View, Text, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { IconButton } from 'react-native-paper';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notification Screen</Text>
      <StatusBar style='auto' />
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
