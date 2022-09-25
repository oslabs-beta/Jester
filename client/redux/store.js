import { configureStore } from '@reduxjs/toolkit'
import testFormReducer from './reducers/testFormSlice';
import slice from './reducers/reducer'
import userInfoReducer from './reducers/userInfoSlice'

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    slice: slice,
    userInfo: userInfoReducer,
  },
})


