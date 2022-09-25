import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  showLogin: false,
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state) => {
      state.showLogin = state.showLogin ? false : true;
      console.log(state.showLogin)
    }
  }
})

export const { setShowLogin } = userInfoSlice.actions;
export default userInfoSlice.reducer;