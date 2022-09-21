import { configureStore } from '@reduxjs/toolkit';
import testFormReducer from './reducers/testFormSlice';

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
  }
})