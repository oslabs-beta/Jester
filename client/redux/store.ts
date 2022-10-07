import { configureStore } from '@reduxjs/toolkit';
import testFormReducer from './reducers/testFormSlice';
import userInputReducer from './reducers/userInputSlice';
import navPanelSlice from './reducers/navPanelSlice';
import slice from './reducers/reducer';
import userInfoReducer from './reducers/userInfoSlice';
import clipbardReducer from './reducers/ClipBoardReducers';
import contributorsReducer from './reducers/ContributorsSlice';

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    userInput: userInputReducer,
    slice: slice,
    clipboard: clipbardReducer,
    userInfo: userInfoReducer,
    navPanel: navPanelSlice,
    contributors: contributorsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
