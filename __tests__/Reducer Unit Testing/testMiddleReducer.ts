import { store } from '../../client/redux/store';
import { setInputType, deleteAssertion } from '../../client/redux/reducers/testFormSlice';

//WORK IN PROGRESS
type assertionListType = {
  [index: string]: string,
}
type defaultStateType = {
  requestType: 'Get' | 'Post' | 'Patch' | 'Delete',
  assertionList: assertionListType,
  i: number,
  userInput: string
}

describe('Test Middle Reducer', () => {
    let defaultState: defaultStateType;
    beforeEach(() => {
      defaultState = {
        requestType: 'Get',
        assertionList: {},
        i: 0,
        userInput: '',
        formValues: { header: { method: 'Get'}, assertions: []},
      };
    });
    describe('default state', () => {
      it('should return a default state', () => {
        const state = store.getState();
        expect(state.testForm).toEqual(defaultState);
      });
    })
})