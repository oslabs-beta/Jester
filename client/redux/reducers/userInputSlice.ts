import { createSlice } from '@reduxjs/toolkit';

type errorMsgsType = {
  [errorKey: string]: string;
};

type initialStateType = {
  errorMsgs: errorMsgsType;
  userInputType: string;
  userInputText: undefined | number | string;
  i: number;
};

const initialState: initialStateType = {
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
      state.userInputType = action.payload;
    },
    setUserInputText: (state, action) => {
      state.userInputText = action.payload;
    },
  },
});

export const {
  setErrorMsg,
  changeErrorMsg,
  setUserInputType,
  setUserInputText,
} = userInputSlice.actions;

export default userInputSlice.reducer;
