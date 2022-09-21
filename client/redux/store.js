import { configureStore } from '@reduxjs/toolkit'
import slice from './reducer'

export const store = configureStore({
  reducer: {
    slice: slice,
  },
})