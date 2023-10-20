import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
};

export const isLoggedSlice = createSlice({
  name: 'isLogged',
  initialState,
  reducers: {
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const {setIsLogged} = isLoggedSlice.actions;

export const selectIsLogged = state => state.isLogged;

export default isLoggedSlice.reducer;