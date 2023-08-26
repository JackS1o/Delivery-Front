import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {featured} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from '../../slices/cart';
import {themeColors} from '../../theme';
import * as Icon from 'react-native-feather';

export default function Orders() {
  const dispatch = useDispatch();
  const totalItems = useSelector(state =>
    selectCartItemsById(state, featured.restaurants[0].dishes[0].id),
  );

  const handleIncrease = () => {
    dispatch(addToCart({...item}));
  };

  const handleDecrease = () => {
    dispatch(removeFromCart({id: item.id}));
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Text className="px-4 py-4 text-2xl font-bold">Meus Pedidos</Text>
      <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image
          className="rounded-3xl"
          style={{height: 100, width: 100}}
          source={featured.restaurants[0].dishes[0].image}
        />
        <View className="flex flex-1 space-y-3">
          <View className="pl-3">
            <Text className="text-xl">
              {featured.restaurants[0].dishes[0].name}
            </Text>
            <Text className="text-gray-700">
              {featured.restaurants[0].dishes[0].description}
            </Text>
          </View>
          <View className="flex-row justify-between pl-3 items-center">
            <Text className="text-gray-700 text-lg font-bold">
              ${featured.restaurants[0].dishes[0].price}
            </Text>
            <View className="flex-row items-center">
              <Text className="px-3 ">{totalItems.length}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
