import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

import { black } from '../config';

type Props = {
  title: string;
  color: string;
  onSelect: () => void;
};

const CategoryGridTile: React.FC<Props> = ({ title, color, onSelect }) => {
  return (
    <View style={styles.gridItem}>
      <TouchableNativeFeedback style={styles.touchable} onPress={onSelect}>
        <View style={{ ...styles.container, backgroundColor: color }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    borderRadius: 10,
    elevation: 3,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
  },
  gridItem: {
    flex: 1,
    height: 150,
    margin: 15,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'right',
  },
  touchable: {
    flex: 1,
  },
});
