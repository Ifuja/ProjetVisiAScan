import React from 'react';
import { Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({ onPress, text, bgColor, fgColor }) => {
  return (
    <Pressable 
     onPress={onPress} 
     style={[
        styles.container, 
        styles['container_PRIMARY'],
        bgColor ? {backgroundColor: bgColor} : {}
     ]}>
     <Text
        style={[
            styles.text, 
            styles['text_${type}'],
            fgColor ? {color: fgColor} : {},
        ]} 
     >
            {text}
     </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#C3D1D9',
    },

    container_TERTIARY: {
        backgroundColor: {},
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'grey',
    },
});

export default CustomButton;