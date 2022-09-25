import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requestType: 'Get',
  assertionList: {},
  i: 0,
  userInput: '',
};

export const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setRequestType: (state, action) => {
      state.requestType = action.payload;
    },
    addAssertion: (state) => {
      state.assertionList[state.i] = 'Status Code';
      state.i += 1;
    },
    setInputType: (state, action) => {
      state.assertionList[action.payload.id] = action.payload.type;
    },
    deleteAssertion: (state, action) => {
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
