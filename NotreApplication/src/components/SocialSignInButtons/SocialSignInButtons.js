import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };
  
  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <View>
        <CustomButton 
          text="Sign In with Facebook" 
          onPress={onSignInFacebook}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />

        <CustomButton 
          text="Sign In with Google" 
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />

        <CustomButton 
          text="Sign In with Apple" 
          onPress={onSignInApple}
          bgColor="#e3e3e3"
          fgColor="#363636"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SocialSignInButtons;
