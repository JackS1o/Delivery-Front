import {configureStore} from '@reduxjs/toolkit';
import cartSlice from '../slices/cart';
import restaurantSlice from '../slices/restaurant';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: restaurantSlice,
  },
});

export default store;
