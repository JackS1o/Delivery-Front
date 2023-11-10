import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Login from '../../components/Login';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLogged, setIsLogged} from '../../slices/isLogged';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const {isLogged} = useSelector(selectIsLogged);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (
      userInfo?.phoneNumber.trim() === '' ||
      userInfo?.address.trim() === ''
    ) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await AsyncStorage.getItem('user');
      console.log(user);
      const parsedUser = JSON.parse(user);
      setUserInfo(parsedUser);
      parsedUser !== null && dispatch(setIsLogged(true));
    };
    getUserInfo();
  }, [isLogged]);

  async function signOut() {
    await GoogleSignin.signOut();
    dispatch(setIsLogged(false));
    await AsyncStorage.removeItem('user');
  }
  console.log(userInfo);
  return (
    <>
      {!isLogged ? (
        <Login />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: userInfo?.picture,
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 16,
            }}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
            {userInfo?.name ? userInfo?.name : 'Nome do Usuário'}
          </Text>
          <Text style={{fontSize: 16, color: 'gray', marginBottom: 12}}>
            {userInfo?.email ? userInfo?.email : 'email@example.com'}
          </Text>
          {/* {isEditing ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, marginBottom: 8}}>Telefone: </Text>
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
                  onChangeText={text =>
                    setUserInfo({...userInfo, phoneNumber: text})
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, marginBottom: 8}}>Endereço: </Text>
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
                  onChangeText={text =>
                    setUserInfo({...userInfo, address: text})
                  }
                />
              </View>
            </>
          ) : (
            <>
              <Text style={{fontSize: 16, marginBottom: 8}}>
                Telefone: {userInfo?.phoneNumber}
              </Text>
              <Text style={{fontSize: 16}}>Endereço: {userInfo?.address}</Text>
            </>
          )} */}
          <TouchableOpacity
            onPress={isEditing ? handleSave : handleEditToggle}
            style={{
              backgroundColor: isEditing ? 'green' : 'blue',
              padding: 8,
              borderRadius: 4,
              marginTop: 12,
            }}>
            <Text style={{color: 'white'}}>
              {isEditing ? 'Salvar' : 'Editar'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signOut}
            style={{
              backgroundColor: 'red',
              padding: 8,
              borderRadius: 4,
              marginTop: 12,
            }}>
            <Text style={{color: 'white'}}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '83%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#1877F2',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
});

export default Profile;
