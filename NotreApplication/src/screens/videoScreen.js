import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { referenceMovie } from '../firebase/index';
import { IconButton } from 'react-native-paper';
import { getDownloadURL, ref } from 'firebase/storage';


export default function VideoScreen({ navigation }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoUrl = await getDownloadURL(ref(referenceMovie));
        setUrl(videoUrl);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    if (!url) {
      fetchVideo();
    }
  }, [url]);
  
  return (
    <View style={styles.container}>
      {url ? (
        <Video
          source={{ uri: url }}
          style={styles.media} // Ajustez les styles selon vos besoins
        />
      ) : (
        <ActivityIndicator />
      )}
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '70%',
    height: '70%',
  },
  video: {
    width: 300,
    height: 200,
  },
  navButton: {
    marginTop: 16,
  },
});