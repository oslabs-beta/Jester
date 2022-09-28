import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type projectsType = {
  project_id: number,
  project_name: string,
  user_id: number,
  clipboardInfo?: string[]
}

type userInfoStateType = {
  showLogin: boolean,
  isLoggedIn: boolean,
  projectsInfo: projectsType[],
}
const initialState: userInfoStateType = {
  showLogin: false,
  isLoggedIn: false,
  projectsInfo: [  {
    project_id: 123,
    project_name: 'project one',
    user_id: 1,
  }]
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
    },
    setClipboardData: (state: userInfoStateType, action: PayloadAction<{projectId: number, clipboardData: string[]}>) => {
      const projects = state.projectsInfo;
      for (let project of projects) {
        if (project.project_id === action.payload.projectId) {
          project.clipboardInfo = action.payload.clipboardData
        }
      }
    }
  }
})

export const { setShowLogin, setProjectNames, setIsLoggedIn, logout, setClipboardData } = userInfoSlice.actions;
export default userInfoSlice.reducer;