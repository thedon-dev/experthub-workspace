"use client";

import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type UserState = {
  value: {
    name: String
  };
};

const initialState = {
  value: [],
} as unknown as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },

    clearUser: (state, action) => {
      state.value = action.payload
    },

    
  }
})

export const { setUser } = userSlice.actions;
export const { clearUser } = userSlice.actions
// export const selectUser = (state: { cart: { value: any; }; }) => state.cart.value;
export default userSlice.reducer;