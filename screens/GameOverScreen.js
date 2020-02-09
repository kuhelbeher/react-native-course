import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import defaultStyles from '../constants/default-styles';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.bodyText}>The game is over</Text>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require('../assets/success.png')}
        // source={{
        //   uri:
        //     'https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg',
        // }}
      />
      <Text style={defaultStyles.bodyText}>Number of rounds: {rounds}</Text>
      <Text style={defaultStyles.bodyText}>Number was: {userNumber}</Text>
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 20,
  },
});

export default GameOverScreen;
