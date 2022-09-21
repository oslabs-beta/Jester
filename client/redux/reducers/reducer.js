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
      state.doneIcon = true;
      console.log('REDUCER: copyText')
      
    },
    userEditText: (state, action) => {
      state.codeOutputEdited = action.payload;
      console.log('REDUCER: userEditText')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeIcon.fulfilled, (state) => {
        console.log('REDUCER: changeIcon')
        state.doneIcon = false;
      });
  }
})

const thunks= {
  changeIcon: createAsyncThunk(
    'slice/changeIcon', 
    async () => {
      const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      const response = await timeout(1000);
      console.log('THUNK: changeIcon', response)
      return response;
  })
}

export const { copyText, userEditText } = slice.actions

export const { changeIcon } = thunks;

export default slice.reducer