"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const ContentCopy_1 = __importDefault(require("@mui/icons-material/ContentCopy"));
const DoneAll_1 = __importDefault(require("@mui/icons-material/DoneAll"));
const react_redux_1 = require("react-redux");
const reducer_1 = require("../redux/reducers/reducer");
const ButtonContainer = (props) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const copyClipboard = () => {
        dispatch((0, reducer_1.copyText)());
        dispatch((0, reducer_1.changeIcon)());
        dispatch((0, reducer_1.asyncChangeIcon)());
    };
    const doneIcon = (0, react_redux_1.useSelector)(state => state.slice.doneIcon);
    return (react_1.default.createElement(Box_1.default, { sx: {
            width: 800,
            marginLeft: 5,
            marginTop: 2,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        } },
        react_1.default.createElement(Button_1.default, { id: "bttn-copy", variant: "outlined", onClick: copyClipboard }, (doneIcon) ? react_1.default.createElement(DoneAll_1.default, null) : react_1.default.createElement(ContentCopy_1.default, null))));
};
exports.default = ButtonContainer;
