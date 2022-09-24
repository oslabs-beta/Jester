"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../client/redux/store");
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
            const state = store_1.store.getState();
            expect(state.testForm).toEqual(defaultState);
        });
    });
});
