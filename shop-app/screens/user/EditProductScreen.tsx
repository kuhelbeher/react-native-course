import React, { useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import { RootState } from '../../store/reducers';
import { updateProduct, createProduct } from '../../store/actions';
import Input from '../../components/UI/Input';

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

type UpdateReducerAction = {
  type: typeof FORM_INPUT_UPDATE;
  name: string;
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
    console.log(formState);
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

  const handleInputChange = useCallback(
    (name: string, value: string, isValid: boolean) => {
      formDispatch({ type: FORM_INPUT_UPDATE, value, isValid, name });
    },
    [formDispatch],
  );

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="height">
      <ScrollView>
        <View style={styles.form}>
          <Input
            name="title"
            label="Title"
            helperText={
              !formState.inputValidities.title
                ? 'Please enter a valid title'
                : null
            }
            initialValue={editedProduct ? editedProduct.title : ''}
            initialIsValid={formState.inputValidities.title}
            onInputChange={handleInputChange}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required
          />
          <Input
            name="imageUrl"
            label="Image Url"
            helperText={
              !formState.inputValidities.imageUrl
                ? 'Please enter a valid image URL'
                : null
            }
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialIsValid={formState.inputValidities.imageUrl}
            onInputChange={handleInputChange}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            required
          />
          {!editedProduct && (
            <Input
              name="price"
              label="Price"
              helperText={
                !formState.inputValidities.price
                  ? 'Please enter a valid price'
                  : null
              }
              initialValue=""
              initialIsValid={formState.inputValidities.price}
              onInputChange={handleInputChange}
              keyboardType="decimal-pad"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              required
              min={0.1}
            />
          )}
          <Input
            name="description"
            label="Description"
            helperText={
              !formState.inputValidities.description
                ? 'Please enter a valid description'
                : null
            }
            initialValue={editedProduct ? editedProduct.description : ''}
            initialIsValid={formState.inputValidities.description}
            onInputChange={handleInputChange}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
});
