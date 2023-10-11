import React, { useEffect, useState } from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {featured} from '../../constants';
import DishRow from '../../components/DishRow';
import Categories from '../../components/Categories';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Products() {
  const navigate = useNavigation();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get('https://app-delivery-z6o6.onrender.com/api/v1/client/products/6510964c23b6150d7f629b2d',
    { headers: { 'Content-Type': 'application/json' } },
    )
    .then(response => {
      setDishes(response.data);
    })
  }, []);

  const dishDetails = (dish) => {
    navigate.navigate('DishDetails', {dishId: dish});
  }

  return (
    <View>
      <ScrollView style={{flex: 1}}>
        <View className="relative">
          <Image
            className="w-full h-20"
            source={require('../../assets/images/pizzaDish.png')}
          />
        </View>
        <Categories />
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className="bg-white -mt-0 pt-3">
          <View className="px-5">
            <Text className="text-3xl font-bold">Lanches do Zé</Text>
          </View>
        </View>
        <View className="pb-6 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {dishes.map((dish, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => dishDetails(dish._id)} >
                <DishRow key={index} item={dish} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
