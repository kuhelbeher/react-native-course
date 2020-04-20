import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const DefaultText = ({ children, ...rest }: PropsWithChildren<TextProps>) => {
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
