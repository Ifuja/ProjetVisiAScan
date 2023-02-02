import React, {useState} from "react";
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/logo_ia.jpg';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn('Sign in');
    };

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };

    const onSignUpPressed = () => {
        console.warn('onSignUpPressed');
    }

    return (
    <ScrollView>
        <View style={styles.root}>
            <Image
             source={Logo} 
             style={[styles.logo, {height: height * 0.3}]} 
             resizeMode="contain"
            />

            <CustomInput 
             placeholder="Username" 
             value={username} 
             setValue={setUsername} 
            />

            <CustomInput 
             placeholder="Password" 
             value={password} 
             setValue={setPassword} 
             secureTextEntry={true}
            />

            <CustomButton 
             text="Sign in" 
             onPress={onSignInPressed} 
            />

            <CustomButton 
             text="Forgot password?" 
             onPress={onForgotPasswordPressed} 
             type="text_TERTIARY" 
            />

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
    logo: {
        width: '80%',
        maxWidth: 300,
        maxHeight: 300,
    },
});

export default SignInScreen;