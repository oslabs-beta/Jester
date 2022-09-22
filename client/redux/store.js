import { configureStore } from '@reduxjs/toolkit'
import testFormReducer from './reducers/testFormSlice';
import userInputReducer from './reducers/userInputSlice';
import slice from './reducers/reducer'

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    userInput: userInputReducer,
    slice: slice,
  },
})


