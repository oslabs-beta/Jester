import { configureStore } from '@reduxjs/toolkit';
import testFormReducer from './reducers/testFormSlice';
import userInputReducer from './reducers/userInputSlice';
import navPanelSlice from './reducers/navPanelSlice';
import slice from './reducers/reducer';
import userInfoReducer from './reducers/userInfoSlice';
import slice1 from './reducers/ClipBoardReducers';

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    userInput: userInputReducer,
    slice: slice,
    slice1: slice1,
    userInfo: userInfoReducer,
    navPanel: navPanelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
