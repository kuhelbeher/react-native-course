import React from 'react';
import { Platform } from 'react-native';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { primaryColor, white } from '../config';

const HeaderButtonComponent: React.FC<HeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? white : primaryColor}
      {...props}
    />
  );
};

export default HeaderButtonComponent;
