"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middle = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const testFormSlice_1 = require("../redux/reducers/testFormSlice");
const Middle = (props) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const currValue = (0, react_redux_1.useSelector)((state) => state.testForm.assertionList[props.id]);
    const handleChange = (event) => {
        dispatch((0, testFormSlice_1.setInputType)({ id: props.id, type: event.target.value }));
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", null,
            react_1.default.createElement(material_1.FormControl, null,
                react_1.default.createElement(material_1.InputLabel, null, "Test Option"),
                react_1.default.createElement(material_1.Select, { name: "more-test-options", id: props.id, value: currValue, onChange: handleChange, displayEmpty: true, inputProps: { 'aria-label': 'Without label' } },
                    react_1.default.createElement(material_1.MenuItem, { key: "Status Code", value: "Status Code", id: props.id }, "Status Code"),
                    react_1.default.createElement(material_1.MenuItem, { key: "Content Type", value: "Content Type", id: props.id }, "Content Type"),
                    react_1.default.createElement(material_1.MenuItem, { key: "Response Body", value: "Response Body", id: props.id }, "Response Body"))),
            react_1.default.createElement(material_1.TextField, { label: "User Input", id: currValue, name: currValue }),
            react_1.default.createElement(material_1.Button, { id: props.id, onClick: (e) => dispatch((0, testFormSlice_1.deleteAssertion)(e.target.id)) }, "-"))));
};
exports.Middle = Middle;
