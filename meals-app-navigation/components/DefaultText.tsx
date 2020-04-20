import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const DefaultText: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={styles.text}>
      {children}
    </Text>
  );
};

export default DefaultText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
  },
});
