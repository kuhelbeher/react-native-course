import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants';

type Props = {
  quantity: number;
  title: string;
  amount: number;
  onRemove: () => void;
};

const CartItem: React.FC<Props> = ({ quantity, title, amount, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{amount.toFixed(2)}</Text>
        <TouchableNativeFeedback onPress={onRemove} useForeground>
          <View style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color={COLORS.red}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 10,
  },
  deleteButton: {
    alignItems: 'center',
    borderRadius: 30,
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    overflow: 'hidden',
    width: 30,
  },
  itemData: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainText: {
    fontFamily: FONTS.primaryBold,
    fontSize: 16,
  },
  quantity: {
    color: COLORS.grey,
    fontFamily: FONTS.primary,
    fontSize: 16,
  },
});
