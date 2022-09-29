import { createSlice } from '@reduxjs/toolkit';

type navPanelStateType = {
  showProjectPanel: boolean;
  showHistoryPanel: boolean;
  showAddProject: boolean;
};

const initialState: navPanelStateType = {
  showProjectPanel: false,
  showHistoryPanel: false,
  showAddProject: false,
};

export const navPanelSlice = createSlice({
  name: 'navPanel',
  initialState,
  reducers: {
    setShowProjectPanel: (state: navPanelStateType) => {
      if (state.showHistoryPanel) state.showHistoryPanel = false;
      state.showProjectPanel = state.showProjectPanel ? false : true;
    },
    setShowHistoryPanel: (state: navPanelStateType) => {
      if (state.showProjectPanel) state.showProjectPanel = false;
      state.showHistoryPanel = state.showHistoryPanel ? false : true;
    },
    setShowAddProject: (state: navPanelStateType) => {
      state.showAddProject = state.showAddProject ? false : true;
    },
  },
});

export const { setShowProjectPanel, setShowHistoryPanel, setShowAddProject } =
  navPanelSlice.actions;
export default navPanelSlice.reducer;
