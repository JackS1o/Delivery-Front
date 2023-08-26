import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '693176297834-gk83g6j3ks0l61sgn0ake65roltk58qk.apps.googleusercontent.com',
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  async function signOut() {
    await auth()
      .signOut()
      .then(async () => {
        await GoogleSignin.signOut().then(() => setUser(null));
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function onGoogleButtonPress() {
    const userInfo = await GoogleSignin.signIn();
    await AsyncStorage.setItem('user', JSON.stringify(userInfo.idToken));
    setUser(userInfo);
    navigation.navigate('PaymentScreen')
  }

  const storeData = async () => {
    try {
      const id = await AsyncStorage.getItem('user');
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Image
            source={require('../../assets/icons8-google-48.png')}
            style={{height: 25, width: 25, marginRight: 10, backgroundColor: 'white', borderRadius: 5}}
          />
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
      <Text>{user?.user?.email}</Text>
      <Text>{user?.user?.name}</Text>
      <Text>{user?.idToken}</Text>
      <Image source={{uri: user?.user?.photo}} style={{width: 100, height: 100}} />
      <TouchableOpacity style={styles.button} onPress={storeData}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
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
