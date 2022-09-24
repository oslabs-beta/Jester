import { store } from '../client/redux/store';
import { changeIcon, userEditText } from '../client/redux/reducers/reducer';

describe('Code Output Reducer', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      codeOutput: `describe('Sample description', (arg1) => { code.. }`,
      codeOutputEdited: undefined,
      doneIcon: false,
    };
  });
  
  it('should return a default state', () => {
    const state = store.getState();
    expect(state.slice).toEqual(defaultState);
  });

  it('doneIcon should update doneIcon in state', () => {
    store.dispatch(changeIcon());
    const newState = store.getState();
    expect(newState.slice.doneIcon).toEqual(true);
  });

  it('should update codeOutputEdited in state', () => {
    const TYPED_TEXT = 'new user typed text';
    store.dispatch(userEditText(TYPED_TEXT));
    const newState = store.getState();
    expect(newState.slice.codeOutputEdited).toEqual(TYPED_TEXT);
  });
  
});