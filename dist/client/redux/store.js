"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const testFormSlice_1 = __importDefault(require("./reducers/testFormSlice"));
const reducer_1 = __importDefault(require("./reducers/reducer"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        testForm: testFormSlice_1.default,
        slice: reducer_1.default,
    },
});
