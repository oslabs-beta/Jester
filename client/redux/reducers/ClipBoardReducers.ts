import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type sliceType1 = {
  codeOutput1: string;
  codeOutputEdited1: string | undefined;
  doneIcon1: boolean;
  server: string;
};

//if state.userInfo.isLoggedIn is true then we can perform get req to backend.
// If user is logged in, can they navigate to a different user's project? Can just make a SQL query to check that incoming user id = project id we are querying for.
// Where is this array of snippets stored in state?
// grabbing CD data from db in this CB component using a useEffect hook.
// Could store it (it refers to the snippet codesv from db) here.
// this value will be saved into the database
//array of code snippets.
const initialState: sliceType1 = {
  // this property of state will get updated by the POST request
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
    appendToClipboard: (state: sliceType1, action: PayloadAction<string>) => {
      const payload = action.payload.split('\n').join('\n  ');
      console.log(payload);
      const codeOutput = state.codeOutput1.slice(0,-3) + `\n  ${payload}` + '\n});';
      state.codeOutput1 = codeOutput;
      console.log(codeOutput);
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

    //add reducer to parse array of snippets and add them to state.
    setCodeOutput1: (state: sliceType1, action: PayloadAction<string[]>) => {
      //need to iterate through the array here and add all the snippets into one snippet here?
      //for blah blah blah -> action.payload = result of strings compiled together.
      //Will the PayloadAction<string> type be an issue here as the type would actually be an array?
      const streeng = action.payload.join('');
      state.codeOutput1 = streeng;
    },
    setBoilerplate: (state: sliceType1) => {
      if (state.codeOutput1 === 'Your Clipboard is currently empty! Please generate a test before we can display your testing code here.')
        state.codeOutput1 = `const request = require(\'supertest\');\nconst server = '${state.server}';\n\ndescribe(\'Route Integration Testing\'), ( ) => {\n});`;
    },
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

export const {
  appendToClipboard,
  copyCB,
  changeIcon1,
  userEditText,
  setCodeOutput1,
  setBoilerplate,
} = slice1.actions;

export const { asyncChangeIcon } = thunks;

export default slice1.reducer;
