import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, ImageBackground } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { reference } from '../firebase/index';
import { getDownloadURL, ref } from 'firebase/storage';

export default function StorageScreen({ navigation }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = await getDownloadURL(ref(reference));
        setUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    if (!url) {
      fetchImage();
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>
          <Title style={styles.titleText}>VisiaScan Pictures</Title>
          {url ? (
            <Image
              source={{ uri: url }}
              style={styles.media}
            />
          ) : (
            <ActivityIndicator />
          )}
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
    flex: 1,
    justifyContent: 'center',
  },
  media: {
    width: '70%',
    height: '60%',
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
