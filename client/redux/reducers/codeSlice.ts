import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type codeStateType = {
  codeOutput: string;
  codeOutputEdited: string | undefined;
};

const initialState: codeStateType = {
  // this property of state will get updated by the POST request
  codeOutput: 'describe(\'Sample description\', (arg1) => { code.. }',
  // this value will be saved into the database
  codeOutputEdited: undefined,
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    copyText: (state: codeStateType) => {
      navigator.clipboard.writeText(state.codeOutputEdited || state.codeOutput);
    },
    userEditText: (state: codeStateType, action: PayloadAction<string>) => {
      state.codeOutputEdited = action.payload;
    },
    setCodeOutput: (state: codeStateType, action: PayloadAction<string>) => {
      state.codeOutput = action.payload;
    },
  },
});

export const { copyText, userEditText, setCodeOutput } = codeSlice.actions;

export default codeSlice.reducer;
