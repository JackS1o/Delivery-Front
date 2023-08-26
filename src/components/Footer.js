import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        className=" bg-white p-2 rounded-lg"
        style={{
          height: 60,
          width: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon.AlignCenter stroke={'gray'} strokeWidth={2} />
        <Text className="text-gray-700" style={{fontSize: 13}}>
          Pedidos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className=" bg-white p-2 rounded-lg"
        style={{
          height: 60,
          width: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon.User stroke={'gray'} strokeWidth={2} />
        <Text className="text-gray-700" style={{fontSize: 13}}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}
