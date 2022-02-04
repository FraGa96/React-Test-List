import { configureStore } from '@reduxjs/toolkit'
import { napsterReducer } from './slices/napsterSlice'

export const store = configureStore({
  reducer: {
    napster: napsterReducer,
  },
});
