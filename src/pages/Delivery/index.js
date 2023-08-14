import React from 'react';
import {Text, View} from 'react-native';
import {featured} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';

export default function Delivery() {
  const restaurant = featured.restaurants[0];
  const navigate = useNavigation();
  return (
    <View>
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
        />
      </MapView>
    </View>
  );
}
