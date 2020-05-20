import React, { useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { FONTS, COLORS } from '../../constants';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import { RootState } from '../../store/reducers';
import { updateProduct, createProduct } from '../../store/actions';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

type FormReducerState = {
  inputValues: {
    title: string;
    imageUrl: string;
    price: string;
    description: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
  };
  formIsValid: boolean;
};

type NameType = keyof FormReducerState['inputValues'];

type UpdateReducerAction = {
  type: typeof FORM_INPUT_UPDATE;
  name: NameType;
  isValid: boolean;
  value: string;
};

type FormReducerActions = UpdateReducerAction;

const formReducer = (
  state: FormReducerState,
  action: FormReducerActions,
): FormReducerState => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const inputValues = {
        ...state.inputValues,
        [action.name]: action.value,
      };
      const inputValidities = {
        ...state.inputValidities,
        [action.name]: action.isValid,
      };

      return {
        ...state,
        inputValues,
        inputValidities,
        formIsValid: Object.values(inputValidities).some(
          (validity) => validity,
        ),
      };
    }
    default: {
      throw new Error('Invalid type for formReducer');
    }
  }
};

const EditProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const id = navigation.getParam('id');

  const dispatch = useDispatch();

  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((product) => product.id === id),
  );

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const handleSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }

    if (editedProduct) {
      dispatch(
        updateProduct({
          id,
          title: formState.inputValues.title,
          imageUrl: formState.inputValues.imageUrl,
          description: formState.inputValues.description,
        }),
      );
    } else {
      dispatch(
        createProduct({
          title: formState.inputValues.title,
          imageUrl: formState.inputValues.imageUrl,
          description: formState.inputValues.description,
          price: parseFloat(formState.inputValues.price),
        }),
      );
    }

    navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, editedProduct, id, formState]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit]);

  const handleChangeText = (name: NameType, value: string) => {
    const isValid = value.trim().length > 0;

    formDispatch({ type: FORM_INPUT_UPDATE, value, isValid, name });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(value) => handleChangeText('title', value)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!formState.inputValidities.title && (
            <Text>Please enter valid title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(value) => handleChangeText('imageUrl', value)}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(value) => handleChangeText('price', value)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(value) => handleChangeText('description', value)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submit = navigation.getParam('submit');

  return {
    headerTitle: navigation.getParam('id') ? 'Edit Product' : 'Add Product',
    headerRight() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submit}
          />
        </HeaderButtons>
      );
    },
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
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
