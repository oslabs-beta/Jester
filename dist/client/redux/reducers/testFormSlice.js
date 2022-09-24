"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssertion = exports.setInputType = exports.addAssertion = exports.setRequestType = exports.testFormSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    requestType: 'Get',
    assertionList: {},
    i: 0,
    userInput: '',
};
exports.testFormSlice = (0, toolkit_1.createSlice)({
    name: 'testForm',
    initialState,
    reducers: {
        setRequestType: (state, action) => {
            state.requestType = action.payload;
        },
        addAssertion: (state) => {
            state.assertionList[state.i] = 'Status Code';
            state.i += 1;
        },
        setInputType: (state, action) => {
            state.assertionList[action.payload.id] = action.payload.type;
        },
        deleteAssertion: (state, action) => {
            delete state.assertionList[action.payload];
        },
    },
});
_a = exports.testFormSlice.actions, exports.setRequestType = _a.setRequestType, exports.addAssertion = _a.addAssertion, exports.setInputType = _a.setInputType, exports.deleteAssertion = _a.deleteAssertion;
exports.default = exports.testFormSlice.reducer;
