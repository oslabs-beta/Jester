import { store } from '../client/redux/store';
import { setInputType, addUserInput, deleteAssertion } from '../client/redux/reducers/testFormSlice';

//WORK IN PROGRESS

describe('Test Middle Reducer', () => {
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
    })
})