import { configureStore } from '@reduxjs/toolkit'
import testFormReducer from './reducers/testFormSlice';
import userInputReducer from './reducers/userInputSlice';
import slice from './reducers/reducer'
import userInfoReducer from './reducers/userInfoSlice'

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    userInput: userInputReducer,
    slice: slice,
    userInfo: userInfoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
