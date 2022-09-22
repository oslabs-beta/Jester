import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { Middle } from '../../components/Middle';

const initialState = {
    errorMsgs: '',
    userInputType: '',
    userInputText: undefined,
  };

export const userInputSlice = createSlice({
    name: 'userInput',
    initialState,
    reducers: {
        setErrorMsgs: (state, action) => {
            //nothing needed?
            state.errorMsgs = action.payload;
        },
        setUserInputType: (state, action) => {
            //e.target.id
            state.userInputType = action.payload;
        },
        setUserInputText: (state, action) => {
            //e.target.value
            state.userInputText = action.payload;
        }
    }
})

export const {
    setErrorMsgs,
    setUserInputType,
    setUserInputText
} = userInputSlice.actions;

export default userInputSlice.reducer;