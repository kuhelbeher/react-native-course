import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import defaultStyles from '../constants/default-styles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: Dimensions.get('window').height / 30,
  },
  resultContainer: {
    marginVertical: Dimensions.get('window').height / 60,
    marginHorizontal: 30,
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 490 ? 16 : 20,
  },
});

export default GameOverScreen;
