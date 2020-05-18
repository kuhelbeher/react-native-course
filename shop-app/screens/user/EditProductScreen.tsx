import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { FONTS, COLORS } from '../../constants';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import { RootState } from '../../store/reducers';
import { updateProduct, createProduct } from '../../store/actions';

const EditProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const id = navigation.getParam('id');

  const dispatch = useDispatch();

  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((product) => product.id === id),
  );

  const [values, setValues] = useState({
    title: editedProduct ? editedProduct.title : '',
    imageUrl: editedProduct ? editedProduct.imageUrl : '',
    price: editedProduct ? editedProduct.price.toString() : '',
    description: editedProduct ? editedProduct.description : '',
  });

  const handleSubmit = useCallback(() => {
    if (editedProduct) {
      dispatch(
        updateProduct({
          id,
          title: values.title,
          imageUrl: values.imageUrl,
          description: values.description,
        }),
      );
    } else {
      dispatch(
        createProduct({
          title: values.title,
          imageUrl: values.imageUrl,
          description: values.description,
          price: parseFloat(values.price),
        }),
      );
    }

    navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, editedProduct, id, values]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit]);

  const handleChangeText = (name: keyof typeof values, value: string) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={values.title}
            onChangeText={(value) => handleChangeText('title', value)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={values.imageUrl}
            onChangeText={(value) => handleChangeText('imageUrl', value)}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={values.price}
              onChangeText={(value) => handleChangeText('price', value)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={values.description}
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
