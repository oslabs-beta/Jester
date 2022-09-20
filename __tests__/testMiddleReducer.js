import { store } from '../client/store';
import { setInputType, addUserInput, deleteAssertion } from '../client/middleSlice';

//WORK IN PROGRESS

describe('Test Middle Reducer', () => {
    let defaultState;
    beforeEach(() => {
      defaultState = {
        userInput: '',
        inputType: 'Status Code',
        assertionList: [],
        i: 0
    };
    });
    describe('default state', () => {
      it('should return a default state', () => {
        const state = store.getState();
        expect(state.middle).toEqual(defaultState);
      });
    })
})