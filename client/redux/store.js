import { configureStore } from '@reduxjs/toolkit'
import testFormReducer from './reducers/testFormSlice';
import middleReducer from './reducers/middleSlice';
import slice from './reducers/reducer'

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    middle: middleReducer,
    slice: slice,
  },
})


