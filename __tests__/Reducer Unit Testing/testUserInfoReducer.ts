import { store } from '../../client/redux/store';
import { setShowLogin } from '../../client/redux/reducers/userInfoSlice';
import { DEFAULT_PROJECT } from '../../client/constants';
import { userInfoStateType } from '../../client/types';


describe('UserInfo Reducer', () => {
  let defaultState: userInfoStateType;

  beforeEach(() => defaultState = {
    showLogin: false,
    showSave: false,
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
    newProject: ''
  });

  test('it should return a default state', () => {
    const state = store.getState();
    expect(state.userInfo).toEqual(defaultState);
  });

  test('setShowLogin should toggle showLogin boolean', () => {
    store.dispatch(setShowLogin());
    let state = store.getState();
    expect(state.userInfo.showLogin).toEqual(true);
    store.dispatch(setShowLogin());
    state = store.getState();
    expect(state.userInfo.showLogin).toEqual(false);
  });
});