import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type assertionListType = {
  [index: string]: string,
}

type initialStateType = {
  requestType: string,
  assertionList: assertionListType,
  i: number,
  userInput: string,
}


const initialState: initialStateType = {
  requestType: 'Get',
  assertionList: {},
  i: 0,
  userInput: '',
};

export const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setRequestType: (state: initialStateType, action: PayloadAction<string>) => {
      state.requestType = action.payload;
    },
    addAssertion: (state: initialStateType) => {
      state.assertionList[state.i] = 'Status Code';
      state.i += 1;
    },
    setInputType: (state: initialStateType, action: PayloadAction<{id: string, type: string}>) => {
      state.assertionList[action.payload.id] = action.payload.type;
    },
    deleteAssertion: (state: initialStateType, action: PayloadAction<string>) => {
      delete state.assertionList[action.payload]
    },
  },
});

export const {
  setRequestType,
  addAssertion,
  setInputType,
  deleteAssertion,
} = testFormSlice.actions;

export default testFormSlice.reducer;
