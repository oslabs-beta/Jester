import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type projectsType = {
  project_id: number,
  project_name: string,
  user_id: number,
}

type userInfoStateType = {
  showLogin: boolean,
  isLoggedIn: boolean,
  projectsInfo: projectsType[]
}
const initialState: userInfoStateType = {
  showLogin: false,
  isLoggedIn: false,
  projectsInfo: []
}
/*
projectsInfo = [
  {
    project_id: 123,
    project_name: project one,
    user_id: 1,
    clipboardInfo: ['code snippet', 'code snippet']
  }
]
*/

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = state.showLogin ? false : true;
    },
    setProjectNames: (state: userInfoStateType, action: PayloadAction<projectsType[]>) => {
      state.projectsInfo = action.payload
    },
    setIsLoggedIn: (state: userInfoStateType) => {
      state.isLoggedIn = state.isLoggedIn ? false : true;
    },
    logout: (state: userInfoStateType) => {
      state = initialState;
    }
  }
})

export const { setShowLogin, setProjectNames, setIsLoggedIn, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;