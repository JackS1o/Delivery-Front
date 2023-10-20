import {createSlice} from '@reduxjs/toolkit';
import { getProducts } from '../utils/products';

const initialState = {
  items: [],
  filteredProducts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        index => index._id === action.payload.id,
      );
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log('Cannot remove a product that is not in the cart');
      }
      state.items = newCart;
    },
    clearCart: state => {
      state.items = [];
    },
    FILTER_PRODUCTS: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectCartItemsById = (state, id) =>
  state.cart.items.filter(item => item._id === id);

export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const filterProductsByCategories = category => async dispatch => {
  try {
    const response = await getProducts()
    
    const filteredProducts = response.data.filter(
      product => product.categoryId === category,
    );
    dispatch({type: 'cart/FILTER_PRODUCTS', payload: filteredProducts});
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

export default cartSlice.reducer;
