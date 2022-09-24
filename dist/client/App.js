"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const Header_1 = require("./components/Header");
const CodeContainer_1 = __importDefault(require("./containers/CodeContainer"));
const ButtonContainer_1 = __importDefault(require("./containers/ButtonContainer"));
const NavBar_1 = __importDefault(require("./components/NavBar"));
const Footer_1 = __importDefault(require("./components/Footer"));
const theme = (0, styles_1.createTheme)({
    palette: {
        primary: {
            main: '#5E17EB',
            contrastText: '#fff'
        },
    },
    typography: {},
});
const App = () => {
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement(Header_1.Header, null),
        react_1.default.createElement(CodeContainer_1.default, null),
        react_1.default.createElement(ButtonContainer_1.default, null),
        react_1.default.createElement(Footer_1.default, null)));
};
exports.default = App;
