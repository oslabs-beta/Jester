import { store } from '../../client/redux/store';
import { setShowLogin } from '../../client/redux/reducers/userInfoSlice';

type projectsType = {
  project_id: number;
  project_name: string;
  user_id: number;
  clipboardInfo?: string[];
  showAccessClipboard: boolean;
};

type userInfoStateType = {
  showLogin: boolean;
  isLoggedIn: boolean;
  userId: number;
  projectsInfo: projectsType[];
};

describe('UserInfo Reducer', () => {
  let defaultState: userInfoStateType;
  beforeEach(() => defaultState = {
    showLogin: false,
    isLoggedIn: false,
    userId: 0,
    projectsInfo: [
      {
        project_id: 0,
        project_name: 'Project One',
        user_id: 0,
        showAccessClipboard: false,
      },
    ],
  });
  test('it should return a default state', () => {
    const state = store.getState();
    expect(state.userInfo).toEqual(defaultState);
  })
  test('setShowLogin should toggle showLogin boolean', () => {
    store.dispatch(setShowLogin());
    let state = store.getState();
    expect(state.userInfo.showLogin).toEqual(true);
    store.dispatch(setShowLogin());
    state = store.getState();
    expect(state.userInfo.showLogin).toEqual(false);
  })
});