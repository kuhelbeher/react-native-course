import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import defaultStyles from '../constants/default-styles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

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
      <View style={styles.resultContainer}>
        <Text style={{ ...defaultStyles.bodyText, ...styles.resultText }}>
          Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
      </View>
      <MainButton onPress={onRestart}>Restart</MainButton>
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
  resultContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default GameOverScreen;
