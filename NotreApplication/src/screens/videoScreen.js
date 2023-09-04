import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Button, ImageBackground } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { referenceMovie } from '../firebase/index';
import { IconButton, Title } from 'react-native-paper';
import { getDownloadURL, ref } from 'firebase/storage';

export default function VideoScreen({ navigation }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState({});
  const videoRef = useRef(null); // Déclarez la référence pour le composant Video

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoUrlFromFirebase = await getDownloadURL(ref(referenceMovie));
        setUrl(videoUrlFromFirebase);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    if (!url) {
      fetchVideo();
    }
  }, [url]);
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (status.isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
        style={styles.backgroundImage}>
        <View style={styles.buttonContainer}>
          <Title style={styles.titleText}>VisiaScan Movies</Title>
          {url ? (
            <Video
              ref={videoRef} // Attachez la référence au composant Video
              source={{ uri: url }}
              style={styles.media}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(status)}
              onError={(error) => console.error('Video error:', error)}
            />
          ) : (
            <ActivityIndicator />
          )}
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={togglePlayPause}
            />
          </View>
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
  navButton: {
    marginTop: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Vous pouvez ajuster le mode de redimensionnement selon vos besoins
    justifyContent: 'center', // Vous pouvez ajuster l'alignement vertical selon vos besoins
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color:'white'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center', // Centre les boutons horizontalement
    alignItems: 'center', // Centre les boutons verticalement
  },
});
