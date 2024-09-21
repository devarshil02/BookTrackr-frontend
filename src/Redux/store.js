import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice'; 

export const store = configureStore({
  reducer: {
    user: AuthReducer, 
  },
});

export default store;
