import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormButton({ title, modeValue, buttonColor, ...rest }) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={[styles.button, { backgroundColor: buttonColor }]}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
  },
  buttonContainer: {
    width: width / 2,
    height: height / 14
  }
});