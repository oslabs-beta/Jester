"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const CodeText_1 = __importDefault(require("../components/CodeText"));
const CodeContainer = (props) => {
    return (react_1.default.createElement(Box_1.default, { sx: {
            width: 800,
            marginTop: 5,
            marginLeft: 5,
            marginBotton: 1,
        } },
        react_1.default.createElement(CodeText_1.default, null)));
};
exports.default = CodeContainer;
