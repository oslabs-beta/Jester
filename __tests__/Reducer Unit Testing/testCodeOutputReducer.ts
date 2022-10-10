import { store } from '../../client/redux/store';
import { userEditText } from '../../client/redux/reducers/codeSlice';

type defaultStateType = {
  codeOutput: string,
  codeOutputEdited: string | undefined,
}

describe('Code Output Reducer', () => {
  let defaultState: defaultStateType;
  beforeEach(() => {
    defaultState = {
      codeOutput: 'describe(\'Sample description\', (arg1) => { code.. }',
      codeOutputEdited: undefined,
    };
  });
  
  it('should return a default state', () => {
    const state = store.getState();
    expect(state.codeSlice).toEqual(defaultState);
  });

  it('should update codeOutputEdited in state', () => {
    const TYPED_TEXT = 'new user typed text';
    store.dispatch(userEditText(TYPED_TEXT));
    const newState = store.getState();
    expect(newState.codeSlice.codeOutputEdited).toEqual(TYPED_TEXT);
  });
  
});
