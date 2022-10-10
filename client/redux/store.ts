import { configureStore } from '@reduxjs/toolkit';
import testFormReducer from './reducers/testFormSlice';
import userInputReducer from './reducers/userInputSlice';
import navPanelReducer from './reducers/navPanelSlice';
import codeSliceReducer from './reducers/codeSlice';
import userInfoReducer from './reducers/userInfoSlice';
import clipbardReducer from './reducers/ClipBoardReducers';

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    userInput: userInputReducer,
    codeSlice: codeSliceReducer,
    clipboard: clipbardReducer,
    userInfo: userInfoReducer,
    navPanel: navPanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
