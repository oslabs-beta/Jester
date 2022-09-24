"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const testFormSlice_1 = require("../redux/reducers/testFormSlice");
const Middle_1 = require("./Middle");
const RequestBody_1 = require("./RequestBody");
const Header = () => {
    const requestType = (0, react_redux_1.useSelector)((state) => state.testForm.requestType);
    const assertionObject = (0, react_redux_1.useSelector)((state) => state.testForm.assertionList);
    const assertionList = [];
    const assertionIds = Object.keys(assertionObject);
    for (let id of assertionIds) {
        assertionList.push(react_1.default.createElement(Middle_1.Middle, { id: id, key: id }));
    }
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit Post Request');
    };
    const handleChange = (e) => dispatch((0, testFormSlice_1.setRequestType)(e.target.value));
    const handleAdd = () => dispatch((0, testFormSlice_1.addAssertion)());
    const menuItems = [];
    const menuOptions = ['Get', 'Post', 'Patch', 'Delete'];
    for (let option of menuOptions) {
        menuItems.push(react_1.default.createElement(material_1.MenuItem, { key: option, value: option }, option));
    }
    return (react_1.default.createElement("form", { id: "test-generator-form", onSubmit: handleSubmit },
        react_1.default.createElement("span", null,
            react_1.default.createElement(material_1.FormControl, null,
                react_1.default.createElement(material_1.InputLabel, { id: "requestSelector" }, "Request Type"),
                react_1.default.createElement(material_1.Select, { name: "request-selector", id: "request-selector", "data-testid": "request-selector", label: "Request Type", value: requestType, onChange: handleChange }, menuItems)),
            react_1.default.createElement(material_1.TextField, { label: "Endpoint", "data-testid": requestType, id: requestType, name: requestType }),
            react_1.default.createElement(RequestBody_1.RequestBody, { requestType: requestType })),
        react_1.default.createElement(material_1.Box, { id: "assertion-list" },
            "Assertion List: ",
            assertionList),
        react_1.default.createElement(material_1.Button, { id: "add-assertion", name: "add-assertion", variant: "contained", onClick: handleAdd }, "+")));
};
exports.Header = Header;
