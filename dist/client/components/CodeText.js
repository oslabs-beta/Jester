"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const react_redux_1 = require("react-redux");
const reducer_1 = require("../redux/reducers/reducer");
const CodeText = (props) => {
    const codeOutput = (0, react_redux_1.useSelector)(state => state.slice.codeOutput);
    const codeOutputEdited = (0, react_redux_1.useSelector)(state => state.slice.codeOutputEdited);
    const dispatch = (0, react_redux_1.useDispatch)();
    const editCode = (e) => dispatch((0, reducer_1.userEditText)(e.target.value));
    return (react_1.default.createElement(TextField_1.default, { id: "code-output", label: "Testing Code", multiline: true, rows: 10, defaultValue: codeOutputEdited || codeOutput, sx: {
            width: 0.95,
            fontFamily: "Source Code Pro",
        }, onChange: editCode }));
};
exports.default = CodeText;
