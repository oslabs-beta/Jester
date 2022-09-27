import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      state.showProjectPanel = state.showProjectPanel ? false : true;
    },
    setShowHistoryPanel: (state: navPanelStateType) => {
      state.showHistoryPanel = state.showHistoryPanel ? false : true;
    },
    
  }
})

export const { setShowProjectPanel, setShowHistoryPanel} = navPanelSlice.actions
export default navPanelSlice.reducer;