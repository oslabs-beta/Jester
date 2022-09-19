import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // this property of state will get updated by the POST request
  codeOutput: "describe('Sample description', (arg1) => { code.. }",
  // this value will be saved into the database
  codeOutputEdited: undefined,
}

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    copyText: (state) => {
      navigator.clipboard.writeText(state.codeOutputEdited || state.codeOutput);
    },
    userEditText: (state, action) => {
      state.codeOutputEdited = action.payload;
    }
  },
})

export const { copyText, userEditText } = slice.actions

export default slice.reducer