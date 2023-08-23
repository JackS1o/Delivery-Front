import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-feather';

export default function Footer() {
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
