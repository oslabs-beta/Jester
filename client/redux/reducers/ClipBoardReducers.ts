import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type sliceType1 = {
  codeOutput1: string,
  codeOutputEdited1: string | undefined,
  doneIcon1: boolean,
}

//if state.userInfo.isLoggedIn is true then we can perform get req to backend.
// If user is logged in, can they navigate to a different user's project? Can just make a SQL query to check that incoming user id = project id we are querying for.
  // Where is this array of snippets stored in state? 
    // grabbing CD data from db in this CB component using a useEffect hook.
    // Could store it (it refers to the snippet codesv from db) here.
  // this value will be saved into the database
//array of code snippets.
const initialState: sliceType1 = {
  // this property of state will get updated by the POST request
  codeOutput1: `Your Clipboard is currently empty!`,

  codeOutputEdited1: undefined,
  doneIcon1: false,
}

export const slice1 = createSlice({
  name: 'slice1',
  initialState,
  reducers: {
    copyCB: (state: sliceType1) => {
      navigator.clipboard.writeText(state.codeOutputEdited1 || state.codeOutput1);
    },

    changeIcon: (state: sliceType1) => {
      state.doneIcon1 = true;
    },

    userEditText: (state: sliceType1, action: PayloadAction<string>) => {
      state.codeOutputEdited1 = action.payload;
    }, 

    //add reducer to parse array of snippets and add them to state.
    setCodeOutput: (state: sliceType1, action: PayloadAction<string>) => {
      //need to iterate through the array here and add all the snippets into one snippet here?
      //for blah blah blah -> action.payload = result of strings compiled together.
      state.codeOutput1 = action.payload;
    }
    
  },
})

const thunks= {
  asyncChangeIcon: createAsyncThunk(
    'slice/asyncChangeIcon', 
    async () => {
      const timeout = (ms: number): Promise<unknown> => new Promise(resolve => setTimeout(resolve, ms));
      const response = await timeout(1000);
      console.log('THUNK: asyncChangeIcon', response)
      return response;
  })
}

export const { copyCB, changeIcon, userEditText, setCodeOutput } = slice1.actions

export const { asyncChangeIcon } = thunks;

export default slice1.reducer