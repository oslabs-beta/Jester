import { createSlice } from '@reduxjs/toolkit';

type stateType = {
  showLogin: boolean,
}
const initialState: stateType = {
  showLogin: false,
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: stateType) => {
      state.showLogin = state.showLogin ? false : true;
      console.log(state.showLogin)
    }
  }
})

export const { setShowLogin } = userInfoSlice.actions;
export default userInfoSlice.reducer;