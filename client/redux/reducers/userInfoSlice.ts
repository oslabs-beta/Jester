import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type projectsType = {
  project_id: number,
  project_name: string,
  user_id: number,
  clipboardInfo?: string[],
  showAccessClipboard: boolean,
  showClipboard: boolean,
}

type userInfoStateType = {
  showLogin: boolean,
  isLoggedIn: boolean,
  projectsInfo: projectsType[],
}
const initialState: userInfoStateType = {
  showLogin: false,
  isLoggedIn: false,
  projectsInfo: [ {
    project_id: 0,
    project_name: 'Project One',
    user_id: 0,
    showAccessClipboard: false,
    showClipboard: false,
  },
]
}

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
    },
    setShowAccessClipboard: (state: userInfoStateType, action: PayloadAction<number>) => {
      const projects = state.projectsInfo;
      for (let project of projects) {
        if (project.project_id === action.payload) { // show the clipboard, test code generator, and delete project buttons for selected project
          project.showAccessClipboard = project.showAccessClipboard ? false : true;
        } else { // hide the clipboard, test code generator, and delete project buttons for all other projects
          project.showAccessClipboard = false;
        }
      }
    }, 
    setShowClipboard: (state: userInfoStateType, action: PayloadAction<number>) => {
      const projects = state.projectsInfo;
      for (let project of projects) {
        if (project.project_id === action.payload) { // show the clipboard, test code generator, and delete project buttons for selected project
          project.showClipboard = project.showClipboard ? false : true;
        } else { // hide the clipboard, test code generator, and delete project buttons for all other projects
          project.showClipboard = false;
        }
      }
    }
  }
})

export const { setShowLogin, setProjectNames, setIsLoggedIn, logout, setClipboardData, setShowAccessClipboard, setShowClipboard } = userInfoSlice.actions;
export default userInfoSlice.reducer;