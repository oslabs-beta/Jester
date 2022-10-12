import { addAssertion, setRequestType } from '../../client/redux/reducers/testFormSlice';
import { store } from '../../client/redux/store';

type assertionListType = {
  [index: string]: string,
}
type defaultStateType = {
  requestType: 'Get' | 'Post' | 'Patch' | 'Delete',
  assertionList: assertionListType,
  i: number,
  userInput: string,
  assertionTypes: Array<string>
}


describe('TestForm Reducer', () => {
  let defaultState: defaultStateType;
  beforeEach(() => {
    defaultState = {
      requestType: 'Get',
      assertionList: {},
      i: 0,
      userInput: '',
      assertionTypes: ['Status Code', 'Content Type', 'Response Body']
    };
  });
  describe('default state', () => {
    it('should return a default state', () => {
      const state = store.getState();
      expect(state.testForm).toEqual(defaultState);
    });
  });
  describe('setRequestType', () => {
    it('should update requestType in state', () => {
      store.dispatch(setRequestType('Post'));
      const newState = store.getState();
      expect(newState.testForm.requestType).toEqual('Post');
    });
  });
  describe('addAssertion', () => {
    it('should update assertionList in state', () => {
      store.dispatch(addAssertion());
      const newState = store.getState();
      expect(newState.testForm.assertionList['0']).toEqual('Status Code');
    });
  });
});
