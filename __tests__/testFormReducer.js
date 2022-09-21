import { store } from '../client/redux/store';
import { setRequestType, addAssertion } from '../client/redux/reducers/testFormSlice';

describe('TestForm Reducer', () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      requestType: 'Get',
      assertionList: {},
      i: 0,
      userInput: '',
      inputType: 'Status Code',
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
      // console.log(newState.testForm.assertionList);
      expect(newState.testForm.assertionList['0']).toEqual('Status Code');
    });
  });
});