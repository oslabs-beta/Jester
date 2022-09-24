"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../client/redux/store");
const reducer_1 = require("../client/redux/reducers/reducer");
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
        const state = store_1.store.getState();
        expect(state.slice).toEqual(defaultState);
    });
    it('doneIcon should update doneIcon in state', () => {
        store_1.store.dispatch((0, reducer_1.changeIcon)());
        const newState = store_1.store.getState();
        expect(newState.slice.doneIcon).toEqual(true);
    });
    it('should update codeOutputEdited in state', () => {
        const TYPED_TEXT = 'new user typed text';
        store_1.store.dispatch((0, reducer_1.userEditText)(TYPED_TEXT));
        const newState = store_1.store.getState();
        expect(newState.slice.codeOutputEdited).toEqual(TYPED_TEXT);
    });
});
