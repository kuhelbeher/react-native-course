import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <Text>The game is over</Text>
      <Text>Number of rounds: {rounds}</Text>
      <Text>Number was: {userNumber}</Text>
      <Button title="Restart" onPress={onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameOverScreen;
