import { createSlice } from "@reduxjs/toolkit";
import React from "react";
// import { Middle } from "../components/Middle"; //SA Import middle component to be rendered onClick of add button

const initialState = {
  requestType: 'Get',
  assertionList: [],
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
      state.assertionList.push(<Middle key={state.assertionList.length}/>) //SA need to create better key
    }
  }
})

export const { setRequestType, addAssertion } = testFormSlice.actions;

export default testFormSlice.reducer;