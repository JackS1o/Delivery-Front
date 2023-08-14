import React from 'react';
import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

export function Login() {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#121212',
      }}>
      <Text style={{fontSize: 30, color: '#e1e1e1', marginBottom: 50}}>
        Página de Login
      </Text>
      <Button title="Entrar com o google" onPress={onGoogleButtonPress} />
      <GoogleSigninButton onPress={onGoogleButtonPress} />
    </View>
  );
}
