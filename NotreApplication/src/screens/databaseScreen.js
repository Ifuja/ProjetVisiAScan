/*** Page affichant les données saisies sur Realtime Database ***/

import { ref, update } from 'firebase/database';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { database } from '../firebase/index'; // Assurez-vous de corriger le chemin vers votre fichier firebase.js
import { IconButton, TextInput } from 'react-native-paper';
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
                buttonColor='grey'
                onPress={create}
            />
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
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    textBoxes: {
        width: '90%',
        fontSize: 18,
        padding: 12,
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 10
    }
});