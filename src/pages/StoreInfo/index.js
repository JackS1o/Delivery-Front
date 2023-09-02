import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Footer from '../../components/Footer';

export default function StoreInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} className='flex-1'>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.header}>Informações</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.info}>Loja do Jackson</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>CNPJ:</Text>
          <Text style={styles.info}>123.456.789-10</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.info}>(11) 99999-9999</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.info}>Rua dos Bobos, 0</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>App desenvolvido por: Jackson e MD</Text>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F7',
  },
  imageContainer: {
    height: 200, 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  info: {
    fontSize: 18,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 7,
  },
});
