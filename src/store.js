import { configureStore } from '@reduxjs/toolkit'
import { napsterReducer } from './reducers/napsterReducer'

export const store = configureStore({
  reducer: {
    napster: napsterReducer
  }
})
