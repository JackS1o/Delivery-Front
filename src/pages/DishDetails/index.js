import React, { useEffect, useState } from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from '../../slices/cart';
import {themeColors} from '../../theme';
import * as Icon from 'react-native-feather';
import {featured} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function DishDetails({route}) {
  const {dishId} = route.params;
  const navigation = useNavigation();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get('https://app-delivery-z6o6.onrender.com/api/v1/client/products/6510964c23b6150d7f629b2d',
    { headers: { 'Content-Type': 'application/json' } },
    )
    .then(response => {
      setDishes(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  const item = dishes.find(item => item._id === dishId);
  const dispatch = useDispatch();
  const totalItems = useSelector(state => selectCartItemsById(state, item?.id));

  const handleIncrease = () => {
    dispatch(addToCart({...item}));
  };

  const handleDecrease = () => {
    dispatch(removeFromCart({id: item?.id}));
  };

  const finishOrder = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container} className="bg-white flex-1">
      <View className="relative py-4 shadow-sm">
        <Image
          source={{uri: item?.url}}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.description}>{item?.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item?.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecrease}
              disabled={!totalItems.length}
              style={[
                styles.quantityButton,
                totalItems.length && styles.activeQuantityButton,
              ]}>
              <Icon.Minus
                strokeWidth={2}
                height={20}
                width={20}
                stroke={'white'}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{totalItems.length}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              style={styles.quantityButton}>
              <Icon.Plus
                strokeWidth={2}
                height={20}
                width={20}
                stroke={'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={finishOrder}>
          <Text style={styles.buyButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'gray',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: themeColors.bgColor(1),
    borderRadius: 20,
    padding: 5,
  },
  activeQuantityButton: {
    backgroundColor: themeColors.bgColor(1),
  },
  quantity: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  buyButton: {
    backgroundColor: themeColors.bgColor(1),
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
