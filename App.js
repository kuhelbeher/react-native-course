import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);

  const handleConfigureNewGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const handleStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const handleGameOver = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={handleGameOver} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        rounds={guessRounds}
        userNumber={userNumber}
        onRestart={handleConfigureNewGame}
      />
    );
  }

  return (
    <View style={styles.screenView}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});

export default App;
