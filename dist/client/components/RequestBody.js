"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBody = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const RequestBody = (props) => {
    if (props.requestType !== 'Get') {
        return (react_1.default.createElement(material_1.TextField, { label: "Request Body", id: "Request-Body", "data-testid": "Request-Body", name: "Request-Body" }));
    }
    else
        return;
};
exports.RequestBody = RequestBody;
