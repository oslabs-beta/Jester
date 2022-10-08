import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type sliceType = {
  codeOutput: string;
  codeOutputEdited: string | undefined;
  doneIcon: boolean;
};

const initialState: sliceType = {
  // this property of state will get updated by the POST request
  codeOutput: "describe('Sample description', (arg1) => { code.. }",
  // this value will be saved into the database
  codeOutputEdited: undefined,
  doneIcon: false,
};

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    copyText: (state: sliceType) => {
      navigator.clipboard.writeText(state.codeOutputEdited || state.codeOutput);
    },
    changeIcon: (state: sliceType) => {
      state.doneIcon = true;
    },
    userEditText: (state: sliceType, action: PayloadAction<string>) => {
      state.codeOutputEdited = action.payload;
    },
    setCodeOutput: (state: sliceType, action: PayloadAction<string>) => {
      state.codeOutput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncChangeIcon.fulfilled, (state: sliceType) => {
      state.doneIcon = false;
    });
  },
});

const thunks = {
  asyncChangeIcon: createAsyncThunk('slice/asyncChangeIcon', async () => {
    const timeout = (ms: number): Promise<unknown> =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const response = await timeout(1000);
    console.log('THUNK: asyncChangeIcon', response);
    return response;
  }),
};

export const { copyText, changeIcon, userEditText, setCodeOutput } =
  slice.actions;

export const { asyncChangeIcon } = thunks;

export default slice.reducer;
