import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { Middle } from '../../components/Middle'; //SA Import middle component to be rendered onClick of add button

const initialState = {
  requestType: 'Get',
  assertionList: {},
  i: 0,
  userInput: '',
  inputType: 'Status Code',
};

export const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setRequestType: (state, action) => {
      state.requestType = action.payload;
    },
    addAssertion: (state) => {
      // state.assertionList[state.i] = <Middle id={state.i} key={state.assertionList.length} />
      // console.log(state.assertionList)
      // state.assertionList.push(<Middle id={state.i} key={state.assertionList.length}  value='Status Code' />)
      // console.log(state.assertionList[0])
      // drill id down to button
      state.i += 1;
      state.assertionList[state.i] = 'Status Code';
    },
    setInputType: (state, action) => {
      console.log(action.payload)
      state.assertionList[action.payload.id] = action.payload.type;
    },
    addUserInput: (state, action) => {
      state.userInput = action.payload.value;
    },
    deleteAssertion: (state, action) => {
      //action payload will equal e.target.id
      delete state.assertionList[action.payload]
      // state.assertionList.splice(action.payload, 1);
    },
  },
});

export const {
  setRequestType,
  addAssertion,
  setInputType,
  addUserInput,
  deleteAssertion,
} = testFormSlice.actions;

export default testFormSlice.reducer;
