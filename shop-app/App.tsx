import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import store from './store/reducers';
import ShopNavigator from './navigation/ShopNavigator';
import { FONTS } from './constants';

const fetchFonts = () => {
  return Font.loadAsync({
    [FONTS.primary]: require('./assets/fonts/OpenSans-Regular.ttf'),
    [FONTS.primaryBold]: require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
