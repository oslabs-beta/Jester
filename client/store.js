import { configureStore } from '@reduxjs/toolkit'
import slice from './reducers/reducer'

export const store = configureStore({
  reducer: {
    slice: slice,
  },
})