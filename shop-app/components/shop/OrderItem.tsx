import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { COLORS, FONTS } from '../../constants';
import { formatDate } from '../../utils';
import { CartItem as CartItemType } from '../../types';
import CartItem from './CartItem';

type Props = {
  amount: number;
  date: Date;
  items: CartItemType[];
};

const OrderItem: React.FC<Props> = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      <Button
        color={COLORS.primary}
        title={`${showDetails ? 'Hide' : 'Show'} Details`}
        onPress={() => {
          setShowDetails((prev) => !prev);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              quantity={item.quantity}
              amount={item.sum}
              title={item.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  date: {
    color: COLORS.grey,
    fontFamily: FONTS.primary,
    fontSize: 16,
  },
  detailItems: {
    width: '100%',
  },
  orderItem: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
  },
  summary: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  totalAmount: {
    fontFamily: FONTS.primaryBold,
    fontSize: 16,
  },
});
