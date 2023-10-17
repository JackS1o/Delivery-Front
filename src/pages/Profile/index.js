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
import googleImg from '../../assets/icons8-google-48.png';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { userInformarion } from '../../utils/login';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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
      const parsedUser = JSON.parse(user);
      setUserInfo(parsedUser);
    };
    getUserInfo();
    GoogleSignin.configure({
      webClientId:
        '693176297834-gk83g6j3ks0l61sgn0ake65roltk58qk.apps.googleusercontent.com',
    });
  }, [userInfo]);

  async function signOut() {
    await GoogleSignin.signOut();
    setUserInfo(null)
    await AsyncStorage.removeItem('user');
  }

  async function onGoogleButtonPress() {
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    if (hasPlayServices) {
      try {
        const userInfo = await GoogleSignin.signIn({
          forceCodeForRefreshToken: true,
        });
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
        setUserInfo(userInfo);
        // await userInformarion(userInfo);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      {userInfo === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
            <Image
              source={googleImg}
              style={{
                height: 25,
                width: 25,
                marginRight: 10,
                backgroundColor: 'white',
                borderRadius: 5,
              }}
            />
            <Text style={styles.buttonText}>Entrar com Google</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: userInfo?.user?.photo,
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 16,
            }}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
            Nome do Usuário
          </Text>
          <Text style={{fontSize: 16, color: 'gray', marginBottom: 12}}>
            {userInfo?.user?.email ? userInfo?.user.email : 'email@example.com'}
          </Text>
          {isEditing ? (
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
          )}
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
            <Text style={{color: 'white'}} >
              Sair
            </Text>
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
    backgroundColor: '#4889f4',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;
