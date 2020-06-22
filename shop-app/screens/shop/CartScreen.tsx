import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { RootState } from '../../store/reducers';
import { removeFromCart, addOrder } from '../../store/actions';
import { COLORS, FONTS } from '../../constants';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import { AppThunkDispatch } from '../../types';

const CartScreen: NavigationStackScreenComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) =>
    Object.values(state.cart.items).sort((a, b) => (a.id > b.id ? 1 : -1)),
  );

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleSendOrder = async () => {
    setIsLoading(true);

    try {
      await dispatch(addOrder(cartItems, totalAmount));
    } catch (error) {
      Alert.alert('An error ocurred!', error.message, [{ text: 'Okay' }]);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Button
            title="Order Now"
            color={COLORS.accent}
            disabled={!cartItems.length}
            onPress={handleSendOrder}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            removable
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            onRemove={() => {
              dispatch(removeFromCart(item.id));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;

const styles = StyleSheet.create({
  amount: {
    color: COLORS.primary,
  },
  screen: {
    margin: 20,
  },
  summary: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: FONTS.primaryBold,
    fontSize: 18,
  },
});
