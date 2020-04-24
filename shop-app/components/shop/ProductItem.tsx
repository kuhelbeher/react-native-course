import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableNativeFeedback,
} from 'react-native';

import { COLORS, FONTS } from '../../constants';

type Props = {
  uri: string;
  title: string;
  price: number;
  onViewDetails: () => void;
  onAddToCart: () => void;
};

const ProductItem: React.FC<Props> = ({
  uri,
  title,
  price,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <View style={styles.product}>
      <TouchableNativeFeedback onPress={onViewDetails} useForeground>
        <View style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            <Button
              color={COLORS.primary}
              title="View Details"
              onPress={onViewDetails}
            />
            <Button
              color={COLORS.primary}
              title="To Cart"
              onPress={onAddToCart}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    height: 300,
    margin: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
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
