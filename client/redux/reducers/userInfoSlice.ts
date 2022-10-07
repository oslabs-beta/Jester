import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_PROJECT } from '../../constants';
import axios from 'axios';
import { userInfoStateType, projectsType } from '../../types';


// const showSave =  (sessionStorage.getItem('clipboardData')) ? true : false;
// For testing only, delete later
const showSave =  true;

const initialState: userInfoStateType = {
  showLogin: false,
  // MLCK what is the name of the property in sessionStorage with clipboard data?
  showSave: showSave,
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
  currentProjectId: 0,
  newProject: ''
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = state.showLogin ? false : true;
    },
    setShowSave: (state: userInfoStateType) => {
      state.showSave = !state.showSave;
    },
    setProjectsInfo: (
      state: userInfoStateType,
      action: PayloadAction<projectsType[]>
    ) => {
      console.log(action.payload);
      state.projectsInfo = action.payload;
    },
    setCurrentProject: (
      state: userInfoStateType,
      action: PayloadAction<string>
    ) => {
      state.currentProject = action.payload;
      const projects = state.projectsInfo.map(el => el.project_name);
      const projectIds = state.projectsInfo.map(el => el.project_id);
      state.currentProjectId = projectIds[projects.indexOf(action.payload)];
    },
    setNewProject: (state: userInfoStateType, action: PayloadAction<string>) => {
      state.newProject = action.payload;
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
  extraReducers: (builder) => {
    builder
    .addCase(addProject.fulfilled, (state: userInfoStateType, action: PayloadAction<any>) => {
      console.log(action.payload.data);
      setProjectsInfo(action.payload.data);
      // this is not working
    })
  }
});

const thunks = {
  addProject: createAsyncThunk(
    'clipboardSlice/addProject', 
    async (projectName: string) => {
      console.log('THUNK: deleteSnippets', 'trying');
      let response;
      try {
        response = await axios.post('api/project/', {
          project_name: projectName,
        })
      } catch (error) {
        console.log('clipboardSlice/addProject', error);
      }
      console.log('THUNK: addProject', response);
      return response;
    })
}

export const {
  setShowLogin,
  setShowSave,
  setProjectsInfo,
  setCurrentProject,
  setIsLoggedIn,
  logout,
  setClipboardData,
  setShowAccessClipboard,
  setUserId,
  setNewProject,
} = userInfoSlice.actions;
export const { addProject } = thunks;
export default userInfoSlice.reducer;
