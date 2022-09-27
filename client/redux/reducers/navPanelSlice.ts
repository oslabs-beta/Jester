import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

type navPanelStateType = {
  showProjectPanel: boolean,
  showHistoryPanel: boolean,
}

const initialState: navPanelStateType = {
  showProjectPanel: false,
  showHistoryPanel: false,
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
    
  }
})

export const { setShowProjectPanel, setShowHistoryPanel} = navPanelSlice.actions
export default navPanelSlice.reducer;