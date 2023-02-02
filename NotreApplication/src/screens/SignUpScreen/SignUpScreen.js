import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onRegisterPressed = () => {
        console.warn('SonRegisterPressed');
    };

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };

    const onSignUpPressed = () => {
        console.warn('onSignUpPressed');
    }

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    }

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    }


    return (
      <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>

            <CustomInput 
             placeholder="Username" 
             value={username} 
             setValue={setUsername} 
            />

            <CustomInput 
             placeholder="Email" 
             value={email} 
             setValue={setEmail} 
             secureTextEntry={true}
            />

            <CustomInput 
             placeholder="Password" 
             value={password} 
             setValue={setPassword} 
             secureTextEntry
            />

            <CustomInput 
             placeholder="Repeat Password" 
             value={repeatPassword} 
             setValue={setRepeatPassword} 
             secureTextEntry
            />

            <CustomButton 
             text="Register" 
             onPress={onRegisterPressed} 
            />

            <Text style={styles.text}>
                En vous inscrivant, vous confirmez que vous acceptez nos {''}
                <Text style={styles.link} onPress={onTermsOfUsePressed}>conditions d'utilisation</Text> et notre {''}
                <Text style={styles.link} onPress={onPrivacyPressed}>politique de confidentialité</Text>
            </Text>

            <SocialSignInButtons />

            <CustomButton 
             text="Don't have an account? Create one" 
             onPress={onSignUpPressed}
             type="TERTIARY"
            />

        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'grey',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    }
});

export default SignUpScreen;