import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as Icon from 'react-native-feather';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const isHome = route.name === 'Home';
  const isProfile = route.name === 'Profile';
  const isOrders = route.name === 'Orders';
  const isStoreInfo = route.name === 'StoreInfo';

  return (
    <View
      style={{
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
      }}>
      {!isHome && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className=" bg-white p-2 rounded-lg"
          style={{
            height: 60,
            width: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon.Home stroke={'gray'} strokeWidth={2} />
          <Text className="text-gray-700" style={{fontSize: 13}}>
            Início
          </Text>
        </TouchableOpacity>
      )}
      {!isOrders && (
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
      )}
      {!isStoreInfo && (
        <TouchableOpacity
          onPress={() => navigation.navigate('StoreInfo')}
          className=" bg-white p-2 rounded-lg"
          style={{
            height: 60,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon.ShoppingBag stroke={'gray'} strokeWidth={2} />
          <Text className="text-gray-700" style={{fontSize: 13}}>
            Informações
          </Text>
        </TouchableOpacity>
      )}
      {!isProfile && (
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
      )}
    </View>
  );
}
