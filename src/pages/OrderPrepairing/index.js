import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Image, Text, View} from 'react-native';

export default function OrderPrepairing() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  })
  return (
    <View className="flex-1 bg-red justify-center items-center">
      <Image
        source={require('../../assets/images/bikeGuy2.gif')}
        className="h-80 w-80"
      />
    </View>
  );
}
