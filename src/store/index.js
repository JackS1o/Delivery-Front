import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import cartSlice from '../slices/cart';
import restaurantSlice from '../slices/restaurant';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: restaurantSlice,
  },
  middleware: [thunk], // Adicione o redux-thunk aqui
});

export default store;
