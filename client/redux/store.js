import { configureStore } from '@reduxjs/toolkit'
import testFormReducer from './reducers/testFormSlice';
import slice from './reducers/reducer'

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    slice: slice,
  },
})


