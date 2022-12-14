import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PROJECT } from '../../constants';
import { projectsType, userInfoStateType } from '../../types';

const showSave = (sessionStorage.getItem('clipboardData')) ? true : false;
const initialState: userInfoStateType = {
  showLogin: false,
  showSave: showSave,
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
  newProject: '',
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
      state.projectsInfo = action.payload;
    },
    setCurrentProject: (
      state: userInfoStateType,
      action: PayloadAction<string>
    ) => {
      state.currentProject = action.payload;
      const projects = state.projectsInfo.map((el) => el.project_name);
      const projectIds = state.projectsInfo.map((el) => el.project_id);
      state.currentProjectId = projectIds[projects.indexOf(action.payload)];
    },
    setNewProject: (
      state: userInfoStateType,
      action: PayloadAction<string>
    ) => {
      state.newProject = action.payload;
    },
    setUserId: (state: userInfoStateType, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    logout: (state: userInfoStateType) => {
      state.projectsInfo = [
        {
          project_id: 0,
          project_name: DEFAULT_PROJECT,
          user_id: 0,
          showAccessClipboard: false,
        },
      ];
      state.userId = 0;
      state.currentProject = DEFAULT_PROJECT;
      state.newProject = '';

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
    builder.addCase(deleteProject.fulfilled, (state: userInfoStateType, action: any) => {
      state.projectsInfo = action.payload.data;
    });
  },
});

const thunks = {
  deleteProject: createAsyncThunk(
    'userInfoSlice/deleteProject',
    async (projectId: number) => {
      let response;
      try {
        response = await axios.delete(`/api/project/${projectId}`);
      } catch (error) {
        console.log('userInfoSlice/deleteProject', error);
      }
      return response;
    }
  ),
};

export const {
  setShowLogin,
  setShowSave,
  setProjectsInfo,
  setCurrentProject,
  logout,
  setClipboardData,
  setShowAccessClipboard,
  setUserId,
  setNewProject,
} = userInfoSlice.actions;

export const { deleteProject } = thunks;

export default userInfoSlice.reducer;
