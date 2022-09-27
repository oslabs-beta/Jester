import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInfoStateType = {
  showLogin: boolean,
  projectNames: string[]
}
const initialState: userInfoStateType = {
  showLogin: false,
  projectNames: [],
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = state.showLogin ? false : true;
    },
    setProjectNames: (state: userInfoStateType, action: PayloadAction<string[]>) => {
      state.projectNames = action.payload
    }
  }
})

export const { setShowLogin, setProjectNames } = userInfoSlice.actions;
export default userInfoSlice.reducer;