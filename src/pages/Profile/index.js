import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Footer from '../../components/Footer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [address, setAddress] = useState('1234 Rua Principal');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (phoneNumber.trim() === '' || address.trim() === '') {
      // Campos vazios, não permitir salvar
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    // Campos preenchidos, permitir salvar
    setIsEditing(false);
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/icons8-google-48.png')}
          style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 16 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Nome do Usuário
        </Text>
        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 12 }}>
          email@example.com
        </Text>
        {isEditing ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Telefone: </Text>
              <TextInput
                style={{
                  width: 200, // Largura fixa do campo
                  fontSize: 16,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 4,
                  paddingHorizontal: 8,
                }}
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Endereço: </Text>
              <TextInput
                style={{
                  width: 200, // Largura fixa do campo
                  fontSize: 16,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 4,
                  paddingHorizontal: 8,
                }}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Telefone: {phoneNumber}
            </Text>
            <Text style={{ fontSize: 16 }}>Endereço: {address}</Text>
          </>
        )}
        <TouchableOpacity
          onPress={isEditing ? handleSave : handleEditToggle}
          style={{
            backgroundColor: isEditing ? 'green' : 'blue',
            padding: 8,
            borderRadius: 4,
            marginTop: 12,
          }}>
          <Text style={{ color: 'white' }}>
            {isEditing ? 'Salvar' : 'Editar'}
          </Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </>
  );
};

export default Profile;
