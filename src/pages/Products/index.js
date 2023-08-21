import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {featured} from '../../constants';
import DishRow from '../../components/DishRow';
import Categories from '../../components/Categories';

export default function Products() {
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
          className="bg-white -mt-1 pt-3">
          <View className="px-5">
            <Text className="text-3xl font-bold">Lanches do Zé</Text>
          </View>
        </View>
        <View className="pb-6 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {featured.restaurants[0].dishes.map((dish, index) => {
            return <DishRow key={index} item={dish} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
