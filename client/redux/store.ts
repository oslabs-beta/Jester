import { configureStore } from '@reduxjs/toolkit';

import clipboardReducer from './reducers/clipboardSlice';
import codeSliceReducer from './reducers/codeSlice';
import navPanelReducer from './reducers/navPanelSlice';
import testFormReducer from './reducers/testFormSlice';
import userInfoReducer from './reducers/userInfoSlice';
import userInputReducer from './reducers/userInputSlice';

export const store = configureStore({
  reducer: {
    testForm: testFormReducer,
    userInput: userInputReducer,
    code: codeSliceReducer,
    clipboard: clipboardReducer,
    userInfo: userInfoReducer,
    navPanel: navPanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
