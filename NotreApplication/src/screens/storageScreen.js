import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Video, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { reference, referenceMovie } from '../firebase/index';

import { getDownloadURL, ref } from 'firebase/storage';

export default function StorageScreen({ route, navigation }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentReference = route.params.contentType === 'image' ? reference : referenceMovie;
        const contentUrl = await getDownloadURL(ref(contentReference));
        setUrl(contentUrl);
      } catch (error) {
        console.error('Error fetching content URL:', error);
      }
    };

    if (!url) {
      fetchContent();
    }
  }, [url, route.params.contentType]);

  return (
    <View style={styles.container}>
      {url ? (
        route.params.contentType === 'image' ? (
          <Image
            style={styles.media}
            source={{ uri: url }}
          />
        ) : (
          <Video
            style={styles.media}
            source={{ uri: url }}
            controls={true} // Vous pouvez activer ou désactiver les contrôles ici
          />
        )
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
  media: {
    width: '70%',
    height: '70%',
  },
  navButton: {
    marginTop: 16,
  },
});