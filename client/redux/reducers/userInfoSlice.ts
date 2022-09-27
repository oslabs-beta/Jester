import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type projectsType = {
  project_id: number,
  project_name: string,
  user_id: number,
}

type userInfoStateType = {
  showLogin: boolean,
  projectsInfo: projectsType[]
}
const initialState: userInfoStateType = {
  showLogin: false,
  projectsInfo: []
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setShowLogin: (state: userInfoStateType) => {
      state.showLogin = state.showLogin ? false : true;
    },
    setProjectNames: (state: userInfoStateType, action: PayloadAction<projectsType[]>) => {
      state.projectsInfo = action.payload
    }
  }
})

export const { setShowLogin, setProjectNames } = userInfoSlice.actions;
export default userInfoSlice.reducer;