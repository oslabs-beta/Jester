import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type sliceType1 = {
  codeOutput1: string;
  codeOutputEdited1: string | undefined;
  doneIcon1: boolean;
  server: string;
};

const initialState: sliceType1 = {
  codeOutput1:
    'Your Clipboard is currently empty! Please generate a test before we can display your testing code here.',
  codeOutputEdited1: undefined,
  doneIcon1: false,
  server: '',
};

export const slice1 = createSlice({
  name: 'slice1',
  initialState,
  reducers: {
    copyCB: (state: sliceType1) => {
      navigator.clipboard.writeText(
        state.codeOutputEdited1 || state.codeOutput1
      );
    },

    changeIcon: (state: sliceType1) => {
      state.doneIcon1 = true;
    },

    userEditText: (state: sliceType1, action: PayloadAction<string>) => {
      state.codeOutputEdited1 = action.payload;
    },
    setCodeOutput1: (state: sliceType1, action: PayloadAction<string[]>) => {
      const codeArr = [
        'const request = require(\'supertest\');\n',
        `const server = '${state.server}';\n\n`,
        'describe(\'Route Integration Testing\'), ( ) => {\n',
        ...action.payload,
        '});',
      ];
      const codeSnippet = codeArr.join('');
      state.codeOutput1 = codeSnippet;
    },
    setServer: (state: sliceType1, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    clearCodeSnippets: (state: sliceType1) => {
      state.codeOutput1 = 'Your Clipboard is currently empty! Please generate a test before we can display your testing code here.';
      state.codeOutputEdited1 = undefined;
      state.server = '';
    }
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

export const { copyCB, changeIcon, userEditText, setCodeOutput1, setServer, clearCodeSnippets } =
  slice1.actions;

export const { asyncChangeIcon } = thunks;

export default slice1.reducer;
