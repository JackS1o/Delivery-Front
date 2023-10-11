import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {featured} from '../../constants';
import {themeColors} from '../../theme';
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {removeFromCart, selectCartItems, selectCartTotal} from '../../slices/cart';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
  const navigation = useNavigation();
  const restaurant = featured.restaurants[0];
  const deliveryFee = 2;

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id].push(item);
      } else {
        group[item._id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  const placeOrder = async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('PaymentScreen')
    }
  }
  
  return (
    <View className="bg-white flex-1">
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>
      <View
        style={{backgroundColor: themeColors.bgColor(0.2)}}
        className="flex-row px-4 items-center">
        <Image
          source={require('../../assets/images/bikeGuy.png')}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{color: themeColors.text}}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="bg-white pt-5">
        {Object.entries(groupedItems).map(([key, items]) => {
          let dish = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
              <Text className="font-bold" style={{color: themeColors.text}}>
                {items.length} x
              </Text>
              <Image className="h-14 w-14 rounded-full" source={dish.image} />
              <Text className="flex-1 fontBold text-gray-700">{dish.name}</Text>
              <Text className="font-semibold text-base">R$ {dish.price.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart({id: dish._id}))}
                className="p-1 rounded-full"
                style={{
                  backgroundColor: themeColors.bgColor(1),
                }}>
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <View
        className="p-6 px-8 rounded-t-3xl space-y-4"
        style={{backgroundColor: themeColors.bgColor(0.2)}}>
        <View className="flex-row justify-between">
          <Text className="ftext-gray-700">Subtotal</Text>
          <Text className="ftext-gray-700">R$ {cartTotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="ftext-gray-700">Delivery Fee</Text>
          <Text className="ftext-gray-700">R$ {deliveryFee.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="ftext-gray-700 font-extrabold">Order total</Text>
          <Text className="ftext-gray-700 font-extrabold">R$ {(cartTotal + deliveryFee).toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          onPress={placeOrder}
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="p-3 rounded-full">
          <Text className="text-center font-bold text-white text-lg">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
