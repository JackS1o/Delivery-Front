import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import googleImg from '../assets/icons8-google-48.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Settings} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '../slices/isLogged';
import {userInformarion} from '../utils/login';

function Login({route}) {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  async function onFacebookButtonPress() {
    Settings.setAppID('1027352108580453');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // obterInformacoesUsuario(facebookCredential.token).then(
    //   informacoesUsuario => {
    //     console.log(informacoesUsuario);
    //   },
    // );
    dispatch(setIsLogged(true));
    return auth().signInWithCredential(facebookCredential);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '693176297834-gk83g6j3ks0l61sgn0ake65roltk58qk.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    if (hasPlayServices) {
      try {
        const userInfo = await GoogleSignin.signIn({
          forceCodeForRefreshToken: true,
        });
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
        await userInformarion(userInfo);
        dispatch(setIsLogged(true));
        if (route?.params?.screen === 'LoginScreen') {
          navigate.navigate('PaymentScreen');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '83%',
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#1877F2',
          padding: 15,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
        onPress={onGoogleButtonPress}>
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
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 10,
          }}>
          Entrar com Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '83%',
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#1877F2',
          padding: 15,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
        onPress={onFacebookButtonPress}>
        <Image
          style={{
            height: 25,
            width: 25,
            marginRight: 10,
            borderRadius: 5,
          }}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png',
          }}
        />
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 10,
          }}>
          Entrar com Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
