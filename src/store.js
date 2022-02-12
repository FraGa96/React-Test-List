import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice';
import { napsterReducer } from './slices/napsterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    napster: napsterReducer,
  },
});
