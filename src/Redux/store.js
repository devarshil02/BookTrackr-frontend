import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice'; 

export const store = configureStore({
  reducer: {
    user: AuthReducer, 
  },
});

export default store;
