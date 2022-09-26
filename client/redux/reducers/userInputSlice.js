import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { Middle } from '../../components/Middle';

const initialState = {
    errorMsgs: {},
    userInputType: '',
    userInputText: undefined,
    i: 0,
  };

export const userInputSlice = createSlice({
    name: 'userInput',
    initialState,
    reducers: {
        setErrorMsg: (state) => {
            state.errorMsgs[state.i] = '';
            state.i = state.i + 1;
        },
        changeErrorMsg: (state, action) => {
            state.errorMsgs[action.payload.propsId] = action.payload.newMsg;
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
    setErrorMsg,
    changeErrorMsg,
    setUserInputType,
    setUserInputText
} = userInputSlice.actions;

export default userInputSlice.reducer;