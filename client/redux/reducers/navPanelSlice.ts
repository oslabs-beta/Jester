import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type navPanelStateType = {
  showProjectPanel: boolean,
  showHistoryPanel: boolean,
  showAddProject: boolean,
  showAccessClipboard: boolean,
}

const initialState: navPanelStateType = {
  showProjectPanel: false,
  showHistoryPanel: false,
  showAddProject: false,
  showAccessClipboard: false,
}

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
      state.showAddProject = state.showAddProject ? false : true
    },
    setShowAccessClipboard: (state: navPanelStateType) => {
      state.showAccessClipboard = state.showAccessClipboard ? false : true
    }
    
  }
})

export const { setShowProjectPanel, setShowHistoryPanel, setShowAddProject, setShowAccessClipboard} = navPanelSlice.actions
export default navPanelSlice.reducer;