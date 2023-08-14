import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import Categories from '../../components/Categories';
import Products from '../Products';
import CardIcon from '../../components/CardIcon';

export default function Home() {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20}}>
      <StatusBar style="light" />
      <Categories />
      <Products />
      <CardIcon />
    </ScrollView>
  );
}
