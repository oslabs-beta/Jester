import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type codeStateType = {
  codeOutput: string;
};

const initialState: codeStateType = {
  // this property of state will get updated by the POST request
  codeOutput: 'describe(\'Sample description\', (arg1) => { code.. }',
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    copyText: (state: codeStateType) => {
      navigator.clipboard.writeText(state.codeOutput);
    },
    setCodeOutput: (state: codeStateType, action: PayloadAction<string>) => {
      state.codeOutput = action.payload;
    },
  },
});

export const { copyText, setCodeOutput } = codeSlice.actions;

export default codeSlice.reducer;
