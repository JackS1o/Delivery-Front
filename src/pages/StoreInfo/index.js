import React from 'react';
import {Text, View} from 'react-native';
import Footer from '../../components/Footer';

export default function StoreInfo() {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>Imformações da loja</Text>
      </View>
      <Footer />
    </View>
  );
}
