import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { ref, update } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { database  } from '../firebase/index'; // Assurez-vous de corriger le chemin vers votre fichier firebase.js
import FormButton from '../components/formButton.js';
import { Title } from 'react-native-paper';
import { reference } from '../firebase/index';

export default function ChatScreen({ navigation }) {
    const [url, setUrl] = useState('');
    const handleOuvrirPorte = () => {
        // Placez ici la logique pour ouvrir la porte
        // Par exemple, vous pouvez envoyer une requête au serveur
        const updates = {};
        updates['/door/door_open'] = true; // Assurez-vous que le chemin correspond à la structure de votre base de données
        update(ref(database), updates)
        .then(() => {
            console.log('Porte ouverte avec succès');
        })
        .catch((error) => {
            console.error("Erreur lors de l'ouverture de la porte :", error);
        });
        // Après avoir effectué l'action, vous pouvez naviguer vers une autre vue si nécessaire
        // Par exemple, naviguer vers une vue de confirmation
        navigation.navigate('Home');
    };

    const handleFermerPorte = () => {
        // Mettre à jour la valeur door_open à false dans la base de données
        const updates = {};
        updates['/door/door_open'] = false; // Assurez-vous que le chemin correspond à la structure de votre base de données
        update(ref(database), updates)
            .then(() => {
            console.log('Porte fermée avec succès');
            })
            .catch((error) => {
            console.error('Erreur lors de la fermeture de la porte :', error);
            });
        // Après avoir effectué l'action, vous pouvez naviguer vers une autre vue si nécessaire
        // Par exemple, naviguer vers une vue de confirmation
        navigation.navigate('Home');
    };

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const imageUrl = await getDownloadURL(storageRef(reference));
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
                    <Title style={styles.titleText}>Répondre à l'appel</Title>
                    {url ? (
                        <Image
                        source={{ uri: url }}
                        style={styles.media}
                        />
                    ) : (
                        <ActivityIndicator />
                    )}
                    <FormButton 
                        title="Oui, ouvrir la porte"
                        modeValue='contained'
                        buttonColor='#008080'
                        labelStyle={styles.loginButtonLabel} 
                        onPress={handleOuvrirPorte} 
                    />
                    <FormButton 
                        title="Non, ne pas ouvrir la porte" 
                        onPress={handleFermerPorte} 
                        labelStyle={styles.loginButtonLabel}
                        buttonColor='#CC6666'
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10,
      color:'white'
    },
    loginButtonLabel: {
      fontSize: 19,
      color:'white'
    },
    navButtonText: {
      fontSize: 20,
      color: 'white'
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
