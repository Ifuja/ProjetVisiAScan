import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
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
