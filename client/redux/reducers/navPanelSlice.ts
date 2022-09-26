import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type navPanelStateType = {
  showProjectPanel: boolean,
}

const initialState: navPanelStateType = {
  showProjectPanel: false,
}

export const navPanelSlice = createSlice({
  name: 'navPanel',
  initialState,
  reducers: {
    setShowProjectPanel: (state: navPanelStateType) => {
      state.showProjectPanel = state.showProjectPanel ? false : true;
    }
  }
})

export const { setShowProjectPanel} = navPanelSlice.actions
export default navPanelSlice.reducer;