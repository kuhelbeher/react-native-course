import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers';
import { COLORS, FONTS } from '../../constants';
import { addToCart } from '../../store/actions';

const ProductDetailedScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const productId = navigation.getParam('productId');

  const product = useSelector((state: RootState) =>
    state.products.availableProducts.find(
      (product) => product.id === productId,
    ),
  );

  const dispatch = useDispatch();

  if (!product) {
    navigation.goBack();
    return null;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={COLORS.primary}
          title="Add to cart"
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

ProductDetailedScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('productTitle'),
  };
};

export default ProductDetailedScreen;

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    marginVertical: 10,
  },
  description: {
    fontFamily: FONTS.primary,
    fontSize: 14,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    height: 300,
    width: '100%',
  },
  price: {
    color: COLORS.grey,
    fontFamily: FONTS.primaryBold,
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
});
