import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-feather';
import { featured } from '../../constants';
import DishRow from '../../components/DishRow';

export default function Products() {
  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={require('../../assets/images/pizzaDish.png')}
          />
        </View>
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-bold">Lanches do Zé</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {featured.restaurants[0].dishes.map((dish, index) => {
            return <DishRow key={index} item={dish} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
