import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import Card from '../UI/Card';
import { COLORS, FONTS } from '../../constants';

type Props = {
  uri: string;
  title: string;
  price: number;
  onSelect: () => void;
};

const ProductItem: React.FC<Props> = ({
  uri,
  title,
  price,
  children,
  onSelect,
}) => {
  return (
    <Card style={styles.product}>
      <TouchableNativeFeedback onPress={onSelect} useForeground>
        <View style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </TouchableNativeFeedback>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '25%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '60%',
    overflow: 'hidden',
    width: '100%',
  },
  price: {
    color: COLORS.grey,
    fontFamily: FONTS.primary,
    fontSize: 14,
  },
  product: {
    height: 300,
    margin: 20,
  },
  title: {
    fontFamily: FONTS.primaryBold,
    fontSize: 18,
    marginVertical: 2,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
