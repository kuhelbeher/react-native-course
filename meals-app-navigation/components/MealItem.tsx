import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { black05, white, lightGrey } from '../config';
import DefaultText from './DefaultText';

type Props = {
  image: string;
  title: string;
  duration: number;
  complexity: string;
  affordability: string;
  onSelectMeal: () => void;
};

const MealItem: React.FC<Props> = ({
  image,
  title,
  duration,
  complexity,
  affordability,
  onSelectMeal,
}) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground source={{ uri: image }} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>{duration}</DefaultText>
            <DefaultText>{complexity.toUpperCase()}</DefaultText>
            <DefaultText>{affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
    justifyContent: 'flex-end',
    width: '100%',
  },
  mealDetail: {
    alignItems: 'center',
    height: '15%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  mealHeader: {
    height: '85%',
  },
  mealItem: {
    backgroundColor: lightGrey,
    borderRadius: 10,
    height: 200,
    marginVertical: 10,
    overflow: 'hidden',
    width: '100%',
  },
  mealRow: {
    flexDirection: 'row',
  },
  title: {
    color: white,
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
  },
  titleContainer: {
    backgroundColor: black05,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});

export default MealItem;
