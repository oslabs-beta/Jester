import { createSlice } from '@reduxjs/toolkit';

type userInfoStateType = {
  showLogin: boolean,
}
const initialState: userInfoStateType = {
  showLogin: false,
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = state.showLogin ? false : true;
    }
  }
})

export const { setShowLogin } = userInfoSlice.actions;
export default userInfoSlice.reducer;