import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  // this property of state will get updated by the POST request
  codeOutput: `describe('Sample description', (arg1) => { code.. }`,
  // this value will be saved into the database
  codeOutputEdited: undefined,
  doneIcon: false,
}

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    copyText: (state) => {
      navigator.clipboard.writeText(state.codeOutputEdited || state.codeOutput);
      // console.log('REDUCER: copyText')
      
    },
    changeIcon: (state) => {
      state.doneIcon = true;
      // console.log('REDUCER: changeIcon')
      
    },
    userEditText: (state, action) => {
      state.codeOutputEdited = action.payload;
      // console.log('REDUCER: userEditText')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncChangeIcon.fulfilled, (state) => {
        // console.log('REDUCER: asyncChangeIcon')
        state.doneIcon = false;
      });
  }
})

const thunks= {
  asyncChangeIcon: createAsyncThunk(
    'slice/asyncChangeIcon', 
    async () => {
      const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      const response = await timeout(1000);
      console.log('THUNK: asyncChangeIcon', response)
      return response;
  })
}

export const { copyText, changeIcon, userEditText } = slice.actions

export const { asyncChangeIcon } = thunks;

export default slice.reducer