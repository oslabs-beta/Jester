import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type codeSliceType = {
  codeOutput: string;
  codeOutputEdited: string | undefined;
  doneIcon: boolean;
};

const initialState: codeSliceType = {
  // this property of state will get updated by the POST request
  codeOutput: 'describe(\'Sample description\', (arg1) => { code.. }',
  // this value will be saved into the database
  codeOutputEdited: undefined,
  doneIcon: false,
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    copyText: (state: codeSliceType) => {
      navigator.clipboard.writeText(state.codeOutputEdited || state.codeOutput);
    },
    changeIcon: (state: codeSliceType) => {
      state.doneIcon = true;
    },
    userEditText: (state: codeSliceType, action: PayloadAction<string>) => {
      state.codeOutputEdited = action.payload;
    },
    setCodeOutput: (state: codeSliceType, action: PayloadAction<string>) => {
      state.codeOutput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncChangeIcon.fulfilled, (state: codeSliceType) => {
      state.doneIcon = false;
    });
  },
});

const thunks = {
  asyncChangeIcon: createAsyncThunk('slice/asyncChangeIcon', async () => {
    const timeout = (ms: number): Promise<unknown> =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const response = await timeout(1000);
    return response;
  }),
};

export const { copyText, changeIcon, userEditText, setCodeOutput } = codeSlice.actions;

export const { asyncChangeIcon } = thunks;

export default codeSlice.reducer;
