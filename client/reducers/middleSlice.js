import React from 'react';
import { Middle } from '../Middle';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInput: '',
    inputType: 'Status Code',
    assertionList: [],
    i: 0
}

export const middleSlice = createSlice({
    name: 'middle',
    initialState,
    reducers: {
        setInputType: (state, action) => {
            state.inputType = action.payload.value;
        },
        addUserInput: (state, action) => {
            state.userInput = action.payload.value;
        },
        deleteAssertion: (state, action) => {
            //action payload will equal e.target.id
            state.assertionList.splice(action.payload, 1);
          }
    }
})

export const { setInputType, addUserInput, deleteAssertion } = middleSlice.actions;

export default middleSlice.reducer;