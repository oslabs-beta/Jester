"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../client/redux/store");
const testFormSlice_1 = require("../client/redux/reducers/testFormSlice");
describe('TestForm Reducer', () => {
    let defaultState;
    beforeEach(() => {
        defaultState = {
            requestType: 'Get',
            assertionList: {},
            i: 0,
            userInput: '',
        };
    });
    describe('default state', () => {
        it('should return a default state', () => {
            const state = store_1.store.getState();
            expect(state.testForm).toEqual(defaultState);
        });
    });
    describe('setRequestType', () => {
        it('should update requestType in state', () => {
            store_1.store.dispatch((0, testFormSlice_1.setRequestType)('Post'));
            const newState = store_1.store.getState();
            expect(newState.testForm.requestType).toEqual('Post');
        });
    });
    describe('addAssertion', () => {
        it('should update assertionList in state', () => {
            store_1.store.dispatch((0, testFormSlice_1.addAssertion)());
            const newState = store_1.store.getState();
            expect(newState.testForm.assertionList['0']).toEqual('Status Code');
        });
    });
});
