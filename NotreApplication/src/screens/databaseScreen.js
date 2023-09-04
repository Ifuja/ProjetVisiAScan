/*** Page affichant les données saisies sur Realtime Database ***/

import { ref, update } from 'firebase/database';
import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { database } from '../firebase/index'; // Assurez-vous de corriger le chemin vers votre fichier firebase.js
import { IconButton, TextInput, Title } from 'react-native-paper';
import FormButton from '../components/formButton.js';

export default function DatabaseScreen({ navigation }) {
    const [value, setValue] = useState('');

    function create () {
        update(ref(database, 'users'), {
            test: value
        })
        .then(() => {
            //alert('data updated!');
            console.log('Data updated');
        })
        .catch((error) => {
            console.error('Realtime Database error:', error);
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/ia.gif')} // Remplacez par le chemin de votre fichier GIF
                style={styles.backgroundImage}>
                <View style={styles.buttonContainer}>       
                    <Title style={styles.titleText}>VisiaScan RealTime Database</Title>
                    <TextInput 
                        value={value} 
                        onChangeText={(newValue) => {setValue(newValue)}} 
                        placeholder="Value" 
                        style={styles.textBoxes}>
                    </TextInput>
                    <FormButton
                        title='Submit'
                        modeValue='contained'
                        labelStyle={styles.loginButtonLabel}
                        buttonColor='#5CA9CB'
                        onPress={create}
                    />
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
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    loginButtonLabel: {
        fontSize: 20,
        color:'black'
    },
    textBoxes: {
        width: '66%',
        fontSize: 18,
        padding: 2,
        borderColor: '#5CA9CB',
        borderWidth: 4,
        borderRadius: 10
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