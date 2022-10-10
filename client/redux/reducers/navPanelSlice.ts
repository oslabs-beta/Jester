import { createSlice } from '@reduxjs/toolkit';
import { createTheme } from '@mui/material/styles';

type navPanelStateType = {
  showProjectPanel: boolean;
  showAddProject: boolean;
  // is this object type useful?
  // setTheme: object;
};

const initialState: navPanelStateType = {
  showProjectPanel: false,
  showAddProject: false,
  // setTheme: createTheme({
  //   palette: {
  //     primary: {
  //       // main: '#5E17EB',
  //       main: '#6e00bb',
  //       contrastText: '#fff'
  //     },
  //     secondary: {
  //       main: '#606F7B',
  //       contrastText: '#fff'
  //     }
  //   },
  //   typography: {
  //     // fontFamily: [
  //     //   'Source Code Pro',
  //     //   'monospace',
  //     // ].join(','),
  //   },
  // }),
};

export const navPanelSlice = createSlice({
  name: 'navPanel',
  initialState,
  reducers: {
    setShowProjectPanel: (state: navPanelStateType) => {
      state.showProjectPanel = state.showProjectPanel ? false : true;
    },
    setShowAddProject: (state: navPanelStateType) => {
      state.showAddProject = state.showAddProject ? false : true;
    },
    // setTheme: (state: navPanelStateType) => {
    // }
  },
});

export const { setShowProjectPanel, setShowAddProject } =
  navPanelSlice.actions;
export default navPanelSlice.reducer;
