import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { referenceMovie } from '../firebase/index';
import { IconButton } from 'react-native-paper';
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
        iconColor='#5b3a70'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  navButton: {
    marginTop: 16,
  },
});
