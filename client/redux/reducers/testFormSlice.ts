import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type assertionListType = {
  [index: string]: string;
};

type assertionTypesType = string[];

type testFormStateType = {
  requestType: string;
  assertionList: assertionListType;
  i: number;
  userInput: string;
  assertionTypes: assertionTypesType;
};

const initialState: testFormStateType = {
  requestType: 'Get',
  assertionList: {},
  i: 0,
  userInput: '',
  assertionTypes: ['Status Code', 'Content Type', 'Response Body'],
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
      if (state.i === 3) state.i = 0;
      state.assertionList[state.i] = state.assertionTypes[state.i];
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
