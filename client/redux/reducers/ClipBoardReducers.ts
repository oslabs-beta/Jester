import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { boilerplate_start, BOILERPLATE_END, DEFAULT_CLIPBOARD } from '../../constants';

type sliceType1 = {
  codeOutput1: string;
  codeOutputEdited1: string | undefined;
  doneIcon1: boolean;
  server: string;
};

type postSnippetPayload = {
  projectId: number,
  codeOutput: string,
}
const initialState: sliceType1 = {
  codeOutput1: DEFAULT_CLIPBOARD,
  codeOutputEdited1: undefined,
  doneIcon1: false,
  server: ''
};

export const slice1 = createSlice({
  name: 'slice1',
  initialState,
  reducers: {
    appendToClipboard: (state: sliceType1, action: PayloadAction<string>) => {
      const payload = action.payload.split('\n').join('\n  ');
      if (state.codeOutputEdited1) {
        const codeOutput =
          state.codeOutputEdited1.slice(0, -3) + `\n  ${payload}` + '\n});';
        state.codeOutputEdited1 = codeOutput;
      } else {
        const codeOutput =
          state.codeOutput1.slice(0, -3) + `\n  ${payload}` + '\n});';
        state.codeOutput1 = codeOutput;
      }
    },
    copyCB: (state: sliceType1) => {
      navigator.clipboard.writeText(
        state.codeOutputEdited1 || state.codeOutput1
      );
    },
    changeIcon1: (state: sliceType1) => {
      state.doneIcon1 = true;
    },

    userEditText: (state: sliceType1, action: PayloadAction<string>) => {
      state.codeOutputEdited1 = action.payload;
    },
    setCodeOutput1: (state: sliceType1, action: PayloadAction<string[]>) => {
      const codeArr = [
        ...boilerplate_start(state.server),
        ...action.payload,
        BOILERPLATE_END
      ];
      const codeSnippet = codeArr.join('');
      state.codeOutput1 = codeSnippet;
    },
    setBoilerplate: (state: sliceType1) => {
      if ( state.codeOutput1 === DEFAULT_CLIPBOARD )
      {const codeArr = [
        ...boilerplate_start(state.server),
        BOILERPLATE_END
      ];
      const codeSnippet = codeArr.join('');
      state.codeOutput1 = codeSnippet;}
    },
    setServer: (state: sliceType1, action: PayloadAction<string>) => {
      state.server = action.payload;
    },
    clearCodeSnippets: (state: sliceType1) => {
      state.codeOutput1 = DEFAULT_CLIPBOARD;
      state.codeOutputEdited1 = undefined;
      state.server = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSnippet.fulfilled, (state: sliceType1) => {
        // nothing to be done here, delete if that's true?
      })
      .addCase(getSnippets.fulfilled, (state: sliceType1, action: any) => {
        const codeArr = [
          ...boilerplate_start(state.server),,
          ...action.payload,
          BOILERPLATE_END
        ];
        const codeSnippet = codeArr.join('');
        state.codeOutput1 = codeSnippet;
      });
  }
});

const thunks = {
  asyncChangeIcon: createAsyncThunk('slice/asyncChangeIcon', async () => {
    const timeout = (ms: number): Promise<unknown> =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const response = await timeout(1000);
    console.log('THUNK: asyncChangeIcon', response);
    return response;
  }),
  postSnippet: createAsyncThunk(
    'slice1/postSnippet', 
    async (payload: postSnippetPayload) => {
      const { projectId, codeOutput } = payload;
      console.log('THUNK: postSnippet', 'trying');
      const response = await axios.post(
        `/api/clipboard/${ projectId }`,
        { code_snippet: codeOutput }
      )
      console.log('THUNK: postSnippet', response);
  }),
  getSnippets: createAsyncThunk(
    'slice1/getSnippets', 
    async (projectId: number) => {
      console.log('THUNK: getSnippets', 'trying');
      const response = await axios.get(`/api/clipboard/${ projectId }`);
      console.log('THUNK: getSnippets', response);
      return response;
  })
};

export const {
  appendToClipboard,
  copyCB,
  changeIcon1,
  userEditText,
  setCodeOutput1,
  setBoilerplate,
  setServer,
  clearCodeSnippets
} = slice1.actions;

export const { asyncChangeIcon, postSnippet, getSnippets } = thunks;

export default slice1.reducer;
