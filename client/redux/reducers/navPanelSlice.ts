import { createSlice } from '@reduxjs/toolkit';

type navPanelStateType = {
  showProjectPanel: boolean;
  showAddProject: boolean;
};

const initialState: navPanelStateType = {
  showProjectPanel: false,
  showAddProject: false,
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
  },
});

export const { setShowProjectPanel, setShowAddProject } = navPanelSlice.actions;

export default navPanelSlice.reducer;
