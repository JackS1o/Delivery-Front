import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
