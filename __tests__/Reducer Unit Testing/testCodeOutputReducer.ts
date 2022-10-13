import { setCodeOutput } from '../../client/redux/reducers/codeSlice';
import { store } from '../../client/redux/store';

type defaultStateType = {
  codeOutput: string,
}

describe('Code Output Reducer', () => {
  let defaultState: defaultStateType;
  beforeEach(() => {
    defaultState = {
      codeOutput: 'describe(\'Sample description\', (arg1) => { code.. }',
    };
  });
  
  it('should return a default state', () => {
    const state = store.getState();
    expect(state.code).toEqual(defaultState);
  });

  it('should update codeOutputEdited in state', () => {
    const TYPED_TEXT = 'new user typed text';
    store.dispatch(setCodeOutput(TYPED_TEXT));
    const newState = store.getState();
    expect(newState.code.codeOutput).toEqual(TYPED_TEXT);
  });
  
});
