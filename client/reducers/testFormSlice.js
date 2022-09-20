import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Middle } from "../components/Middle"; //SA Import middle component to be rendered onClick of add button

const initialState = {
  requestType: 'Get',
  assertionList: [],
  i:0,
}

export const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setRequestType: (state, action) => {
      console.log('action', action)
      state.requestType = action.payload;
      console.log('state value: ', state.requestType);
    },
    addAssertion: (state) => {
      state.assertionList.push(<Middle id={state.i} key={state.assertionList.length}/>); // drill id down to button 
      state.i += 1;
    }
  }
})

export const { setRequestType, addAssertion } = testFormSlice.actions;

export default testFormSlice.reducer;