import { store } from '../../client/redux/store';
import { setShowLogin } from '../../client/redux/reducers/userInfoSlice';

type defaultStateType = {
  showLogin: boolean,
  isLoggedIn: boolean,
}

describe('UserInfo Reducer', () => {
  let defaultState: defaultStateType;
  beforeEach(() => {
    defaultState = {
      showLogin: false,
      isLoggedIn: false,
    };
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