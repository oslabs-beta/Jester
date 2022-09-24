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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React_1 = __importDefault(require("React"));
const react_redux_1 = require("react-redux");
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const CodeContainer_1 = __importDefault(require("../client/containers/CodeContainer"));
const ButtonContainer_1 = __importDefault(require("../client/containers/ButtonContainer"));
const Header_1 = require("../client/components/Header");
const redux_mock_store_1 = __importDefault(require("redux-mock-store"));
require("@testing-library/jest-dom");
const RequestBody_1 = require("../client/components/RequestBody");
const initialState = { slice: {
        codeOutput: `describe('Sample description')`,
    } };
const clickedState = { slice: {
        doneIcon: true,
    } };
const mockStore = (0, redux_mock_store_1.default)();
const code = () => {
    (0, react_1.render)(React_1.default.createElement(react_redux_1.Provider, { store: mockStore(initialState) },
        React_1.default.createElement(CodeContainer_1.default, null)));
};
const button = () => {
    (0, react_1.render)(React_1.default.createElement(react_redux_1.Provider, { store: mockStore(initialState) },
        React_1.default.createElement(ButtonContainer_1.default, null)));
};
const buttonDone = () => {
    (0, react_1.render)(React_1.default.createElement(react_redux_1.Provider, { store: mockStore(clickedState) },
        React_1.default.createElement(ButtonContainer_1.default, null)));
};
describe('Unit testing Output Container components', () => {
    test('Renders placeholder code output in Code Container', () => {
        code();
        const codeOutput = react_1.screen.getByLabelText('Testing Code');
        expect(codeOutput.innerHTML).toEqual(`describe('Sample description')`);
    }),
        test('Renders copy to clipboard button', () => {
            button();
            const bttn = react_1.screen.getByRole('button', { name: '' });
            expect(bttn).toBeInTheDocument();
        }),
        test('Renders ContentCopyIcon inside button', () => {
            button();
            const bttn = react_1.screen.getByRole('button', { name: '' });
            const copyIcon = bttn.innerHTML.includes('data-testid=\"ContentCopyIcon\"');
            expect(copyIcon).toBeTruthy();
        }),
        test('Renders DoneAllIcon on state change', () => {
            buttonDone();
            let bttn = react_1.screen.getByRole('button', { name: '' });
            const checkIcon = bttn.innerHTML.includes('data-testid=\"DoneAllIcon\"');
            expect(checkIcon).toBeTruthy();
        });
});
describe('Unit testing "Header" component', () => {
    const initialState = { testForm: {
            requestType: 'Get',
            assertionList: {},
            i: 0,
            userInput: '',
        } };
    const mockStore = (0, redux_mock_store_1.default)();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
        (0, react_1.render)(React_1.default.createElement(react_redux_1.Provider, { store: store },
            React_1.default.createElement(Header_1.Header, null)));
    });
    test('Header component renders successfully', () => {
        store = mockStore(initialState);
        (0, react_1.render)(React_1.default.createElement(react_redux_1.Provider, { store: store },
            React_1.default.createElement(Header_1.Header, null)));
    });
    xtest('Dropdown menu for request type renders successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        user_event_1.default.click(react_1.screen.getByRole('button', { name: 'Get' }));
        yield (() => UserEvent.click(react_1.screen.getByText(/Post/i)));
        expect(yield react_1.screen.getByText('Post')).toBeInTheDocument();
    }));
    test('Add assertion button renders successfully', () => {
        expect(react_1.screen.getByText('+')).toBeInTheDocument();
        const addAssertionButton = react_1.screen.getByText('+');
        expect(addAssertionButton.type).toEqual('button');
    });
    test('Endpoint textbox renders successfully', () => {
        const textbox = react_1.screen.getByLabelText('Endpoint');
        expect(textbox).toBeInTheDocument();
        expect(textbox.type).toEqual('text');
        expect(textbox.id).toEqual('Get');
    });
    xtest('Add button renders middle component', () => {
        react_1.fireEvent.click(react_1.screen.getByText('+'));
        const dropdown = react_1.screen.getByLabelText('Test Option');
        expect(dropdown).toBeInTheDocument();
        const textbox = react_1.screen.getByLabelText('User Input');
        expect(textbox).toBeInTheDocument();
        expect(textbox.type).toEqual('text');
        const button = react_1.screen.getByText('-');
        expect(button).toBeInTheDocument();
        expect(button.type).toEqual('Button');
    });
});
describe('Unit testing "RequestBody" component', () => {
    const initialState = { testForm: {
            requestType: 'Post',
            assertionList: {},
            i: 0,
            userInput: '',
        } };
    const mockStore = (0, redux_mock_store_1.default)();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
        (0, react_1.render)(React_1.default.createElement(react_redux_1.Provider, { store: store },
            React_1.default.createElement(RequestBody_1.RequestBody, null)));
    });
    test('Request body textbox renders successfully when requestType is Post, Patch, or Delete', () => {
        expect(react_1.screen.getByTestId('Request-Body')).toBeInTheDocument();
    });
});
