import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState(null);

  const handleStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
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
