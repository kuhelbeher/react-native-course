import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { RootState } from '../../store/reducers';
import { removeFromCart } from '../../store/actions';
import { COLORS, FONTS } from '../../constants';
import CartItem from '../../components/shop/CartItem';

const CartScreen: NavigationStackScreenComponent = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) =>
    Object.entries(state.cart.items)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => (a.id > b.id ? 1 : -1)),
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order Now"
          color={COLORS.accent}
          disabled={!cartItems.length}
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
  },
  summaryText: {
    fontFamily: FONTS.primaryBold,
    fontSize: 18,
  },
});
