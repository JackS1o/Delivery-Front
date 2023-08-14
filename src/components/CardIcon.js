import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {themeColors} from '../theme';
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';

export default function CardIcon() {
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{backgroundColor: themeColors.bgColor(1)}}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg">
        <View
          className="p-2 px-4 rounded-full"
          style={{
            backgroundColor: themeColors.bgColor('rgba(255, 255, 255, 0,3'),
          }}>
          <Text className="font-extrabold text-white text-lg">3</Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          View Card
        </Text>
        <Text className="font-extrabold text-white text-lg">${23}</Text>
      </TouchableOpacity>
    </View>
  );
}
