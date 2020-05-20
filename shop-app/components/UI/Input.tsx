import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from 'react-native';
import { FONTS, COLORS } from '../../constants';

type Props = TextInputProps & {
  name: string;
  label: string;
  initialValue?: string;
  initialIsValid: boolean;
  helperText: string | null;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  onInputChange: (name: string, value: string, isValid: boolean) => void;
};

const Input: React.FC<Props> = ({
  name,
  label,
  helperText,
  initialValue,
  initialIsValid,
  required,
  email,
  min,
  max,
  minLength,
  onInputChange,
  ...rest
}) => {
  const [state, setState] = useState({
    value: initialValue || '',
    isValid: initialIsValid,
    touched: false,
  });

  useEffect(() => {
    if (state.touched) {
      onInputChange(name, state.value, state.isValid);
    }
  }, [onInputChange, state, name]);

  const handleChangeText = (value: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && value.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(value.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +value < min) {
      isValid = false;
    }
    if (max != null && +value > max) {
      isValid = false;
    }
    if (minLength != null && value.length < minLength) {
      isValid = false;
    }

    setState({ ...state, value, isValid });
  };

  const handleBlur = () => {
    setState({ ...state, touched: true });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={styles.input}
        value={state.value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
      />
      {!state.isValid && state.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{helperText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: COLORS.red,
    fontFamily: FONTS.primary,
    fontSize: 13,
  },
  formControl: {
    width: '100%',
  },
  input: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  label: {
    fontFamily: FONTS.primaryBold,
    marginVertical: 8,
  },
});
