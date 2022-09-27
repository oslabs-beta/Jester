import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeyObject } from 'crypto';

type assertionListType = {
  [index: string]: string;
};
type individualAssertionObject = {
  [key: string]: string;
};

type testFormStateType = {
  requestType: string;
  assertionList: assertionListType;
  i: number;
  userInput: string;
};

const initialState: testFormStateType = {
  requestType: 'Get',
  assertionList: {},
  i: 0,
  userInput: '',
};

export const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setRequestType: (
      state: testFormStateType,
      action: PayloadAction<string>
    ) => {
      state.requestType = action.payload;
    },
    addAssertion: (state: testFormStateType) => {
      state.assertionList[state.i] = 'Status Code';
      state.i += 1;
    },
    setInputType: (
      state: testFormStateType,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      state.assertionList[action.payload.id] = action.payload.type;
    },
    deleteAssertion: (
      state: testFormStateType,
      action: PayloadAction<string>
    ) => {
      delete state.assertionList[action.payload];
    },
  },
});

export const { setRequestType, addAssertion, setInputType, deleteAssertion } =
  testFormSlice.actions;

export default testFormSlice.reducer;
