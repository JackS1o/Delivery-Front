import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../pages/welcome';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import PaymentScreen from '../pages/Payment';
import OrderPrepairing from '../pages/OrderPrepairing';
import Delivery from '../pages/Delivery';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <Stack.Screen
        name="OrderPrepairing"
        component={OrderPrepairing}
        options={{headerShown: false, presentation: 'fullScreenModal'}}
      />
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{headerShown: false, presentation: 'fullScreenModal'}}
      />
      <Stack.Screen 
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Orders'
        component={Orders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
