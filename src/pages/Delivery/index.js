import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {featured} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {themeColors} from '../../theme';
import * as Icon from 'react-native-feather';
import {useDispatch} from 'react-redux';
import {clearCart} from '../../slices/cart';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

export default function Delivery() {
  const restaurant = featured.restaurants[0];
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const cancelOrder = () => {
    navigate.navigate('Home');
    dispatch(clearCart());
  };
  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard">
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.address}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Tempo Estimado
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20-30 minutos
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Aguardando confirmação do restaurante!
            </Text>
          </View>
          <Image
            className="w-24 h-24"
            source={require('../../assets/images/bikeGuy2.gif')}
          />
        </View>
        <View
          style={{backgroundColor: themeColors.bgColor(0.8)}}
          className="p-2 flex-row justify-between items-center rounded-lg my-5 mx-2">
          <View className="flex-1 ml-3">
            <View style={{height: 120, width: 250 }}>
              <ProgressSteps>
                <ProgressStep label="Aguardando confirmação" />
                <ProgressStep label="Em preparo" />
                <ProgressStep label="Saiu para entrega!" />
              </ProgressSteps>
            </View>
          </View>
          <View className="flex-row items-center space-x-1 mr-2">
            <TouchableOpacity
              className=" bg-white p-2 rounded-lg"
              style={{height: 60, width: 40}}>
              <Icon.Phone
                fill={themeColors.bgColor(1)}
                stroke={themeColors.bgColor(1)}
                strokeWidth={1}
              />
              <Text className="text-gray-700" style={{fontSize: 10}}>
                Ligar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelOrder}
              className=" bg-white p-2 rounded-lg"
              style={{height: 60, width: 43}}>
              <Icon.Menu stroke={'yellow'} strokeWidth={4} />
              <Text className="text-gray-700" style={{fontSize: 10}}>
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
