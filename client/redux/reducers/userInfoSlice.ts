import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROJECT } from '../../constants';

type projectsType = {
  project_id: number;
  project_name: string;
  user_id: number;
  clipboardInfo?: string[];
  showAccessClipboard: boolean;
};

type userInfoStateType = {
  showLogin: boolean;
  isLoggedIn: boolean;
  userId: number;
  projectsInfo: projectsType[];
  currentProject: string;
};
const initialState: userInfoStateType = {
  showLogin: false,
  isLoggedIn: false,
  userId: 0,
  projectsInfo: [
    {
      project_id: 0,
      project_name: DEFAULT_PROJECT,
      user_id: 0,
      showAccessClipboard: false,
    },
  ],
  currentProject: DEFAULT_PROJECT,
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = state.showLogin ? false : true;
    },
    setProjectsInfo: (
      state: userInfoStateType,
      action: PayloadAction<projectsType[]>
    ) => {
      state.projectsInfo = action.payload;
    },
    setCurrentProject: (
      state: userInfoStateType,
      action: PayloadAction<string>
    ) => {
      state.currentProject = action.payload;
    },
    setIsLoggedIn: (state: userInfoStateType) => {
      state.isLoggedIn = state.isLoggedIn ? false : true;
    },
    setUserId: (state: userInfoStateType, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    logout: (state: userInfoStateType) => {
      state = initialState;
    },
    setClipboardData: (
      state: userInfoStateType,
      action: PayloadAction<{ projectId: number; clipboardData: string[] }>
    ) => {
      const projects = state.projectsInfo;
      for (const project of projects) {
        if (project.project_id === action.payload.projectId) {
          project.clipboardInfo = action.payload.clipboardData;
        }
      }
    },
    setShowAccessClipboard: (
      state: userInfoStateType,
      action: PayloadAction<number>
    ) => {
      const projects = state.projectsInfo;
      for (const project of projects) {
        if (project.project_id === action.payload) {
          project.showAccessClipboard = project.showAccessClipboard
            ? false
            : true;
        } else {
          project.showAccessClipboard = false;
        }
      }
    },
  },
});

export const {
  setShowLogin,
  setProjectsInfo,
  setCurrentProject,
  setIsLoggedIn,
  logout,
  setClipboardData,
  setShowAccessClipboard,
  setUserId,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
