import { createSlice } from '@reduxjs/toolkit';

type userInfoStateType = {
  showLogin: boolean,
  isLoggedIn: boolean,
}
const initialState: userInfoStateType = {
  showLogin: false,
  isLoggedIn: false,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = !state.showLogin;
    },
    setIsLoggedIn: (state: userInfoStateType) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    logout: (state: userInfoStateType) => {
      // MLCK: Do we really want to clear the entire state? 
      // Even so, we may need to do a loop on each property
      state = initialState;
    },
  }
});

export const { setShowLogin, setIsLoggedIn, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;