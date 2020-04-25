import React from 'react';
import { Platform } from 'react-native';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants';

const HeaderButtonComponent: React.FC<HeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? COLORS.white : COLORS.primary}
      {...props}
    />
  );
};

export default HeaderButtonComponent;
