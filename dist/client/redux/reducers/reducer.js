"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncChangeIcon = exports.userEditText = exports.changeIcon = exports.copyText = exports.slice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    codeOutput: `describe('Sample description', (arg1) => { code.. }`,
    codeOutputEdited: undefined,
    doneIcon: false,
};
exports.slice = (0, toolkit_1.createSlice)({
    name: 'slice',
    initialState,
    reducers: {
        copyText: (state) => {
            navigator.clipboard.writeText(state.codeOutputEdited || state.codeOutput);
        },
        changeIcon: (state) => {
            state.doneIcon = true;
        },
        userEditText: (state, action) => {
            state.codeOutputEdited = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.asyncChangeIcon.fulfilled, (state) => {
            state.doneIcon = false;
        });
    }
});
const thunks = {
    asyncChangeIcon: (0, toolkit_1.createAsyncThunk)('slice/asyncChangeIcon', () => __awaiter(void 0, void 0, void 0, function* () {
        const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        const response = yield timeout(1000);
        console.log('THUNK: asyncChangeIcon', response);
        return response;
    }))
};
_a = exports.slice.actions, exports.copyText = _a.copyText, exports.changeIcon = _a.changeIcon, exports.userEditText = _a.userEditText;
exports.asyncChangeIcon = thunks.asyncChangeIcon;
exports.default = exports.slice.reducer;
