import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import Products from '../Products';
import CardIcon from '../../components/CardIcon';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        <StatusBar style="light" />
        <Products />
      </ScrollView>
      <CardIcon />
    </View>
  );
}
