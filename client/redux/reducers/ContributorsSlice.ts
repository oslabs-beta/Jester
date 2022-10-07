import { createSlice } from '@reduxjs/toolkit';

type contributorsStateType = {
    names: string[],
    githubLinks: string[],
    linkedInLinks: string[],
    imageUrls: string[]
    i: number
}

const initialState: contributorsStateType = {
  names: ['Michael Lam', 'Brian Hao', 'Anshuman Sinha', 'Serena Amos', 'Lilah August'],
  githubLinks: ['', '', '', '', ''],
  linkedInLinks:['', '', '', '', ''],
  imageUrls: ['', '', '', '', ''],
  i: 0
};

export const ContributorsSlice = createSlice({
  name: 'contributors',
  initialState,
  reducers: {
    incrementI: (state: contributorsStateType) => {
      state.i = state.i + 1;
    }
  }
});

export const { incrementI } = ContributorsSlice.actions;
export default ContributorsSlice.reducer;