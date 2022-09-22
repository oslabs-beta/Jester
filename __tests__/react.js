import React from 'React';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodeContainer from '../client/containers/CodeContainer';
import ButtonContainer from '../client/containers/ButtonContainer';
import { Header } from '../client/components/Header';
import { setRequestType } from '../client/redux/reducers/testFormSlice';

import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import { RequestBody } from '../client/components/RequestBody';

const initialState = {
  slice: {
    codeOutput: `describe('Sample description')`,
  },
};
const mockStore = configureStore();

const code = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <CodeContainer />
    </Provider>
  );
};

const button = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <ButtonContainer />
    </Provider>
  );
};

describe('Unit testing Output Container components', () => {
  test('Renders placeholder code output in Code Container', () => {
    code();
    const codeOutput = screen.getByLabelText('Testing Code');
    expect(codeOutput.innerHTML).toEqual(`describe('Sample description')`);
  }),
    test('Renders copy to clipboard button', () => {
      button();
      const bttn = screen.getByRole('button', { name: '' });
      expect(bttn).toBeInTheDocument();
    }),
    test('Renders ContentCopyIcon inside button', () => {
      button();
      const bttn = screen.getByRole('button', { name: '' });
      const copyIcon = bttn.innerHTML.includes('data-testid="ContentCopyIcon"');
      expect(copyIcon).toBeTruthy();
    }),
    xtest('Renders DoneAllIcon on button click', () => {
      button();
      let bttn = screen.getByRole('button', { name: '' });
      fireEvent.click(bttn);
      bttn = screen.getByRole('button', { name: '' });
      const checkIcon = bttn.innerHTML.includes('data-testid="DoneAllIcon"');
      expect(checkIcon).toBeTruthy();
    }),
    xtest('Button onclick changes icon and copies base text to clipboard', () => {}),
    xtest('State is updated when user types in text box', () => {
      // const TYPED_TEXT = 'new user typed text';
      // let state = store.setState();
      // let codeOutput = screen.getByLabelText('Testing Code');
      // expect(codeOutput).toHaveTextContent(TYPED_TEXT);
    }),
    xtest('Button onclick copies edited text to clipboard', () => {});
});

describe('Unit testing "Header" component', () => {
  const initialState = { testForm: {
    requestType: 'Get',
    assertionList: {},
    i: 0,
    userInput: '',
  } };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });
  test('Header component renders successfully', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });
  xtest('Dropdown menu for request type renders successfully', async () => {
    // const dropdown = screen.getByDisplayValue('Get');
    // console.log(dropdown)
    // expect(dropdown.type).toEqual('text');
    // const dropdown = document.querySelector('#request-selector')

    userEvent.click(screen.getByRole('button', { name: 'Get' }));
    await (() => UserEvent.click(screen.getByText(/Post/i)));
    expect(await screen.getByText('Post')).toBeInTheDocument();
  });
  test('Add assertion button renders successfully', () => {
    expect(screen.getByText('+')).toBeInTheDocument();
    const addAssertionButton = screen.getByText('+');
    expect(addAssertionButton.type).toEqual('button');
  });
  test('Endpoint textbox renders successfully', () => {
    const textbox = screen.getByLabelText('Endpoint');
    expect(textbox).toBeInTheDocument();
    expect(textbox.type).toEqual('text');
    expect(textbox.id).toEqual('Get');
  });
  xtest('Add button renders middle component', () => {
    fireEvent.click(screen.getByText('+'));
    const dropdown = screen.getByLabelText('Test Option');
    expect(dropdown).toBeInTheDocument();
    const textbox = screen.getByLabelText('User Input');
    expect(textbox).toBeInTheDocument();
    expect(textbox.type).toEqual('text');
    const button = screen.getByText('-');
    expect(button).toBeInTheDocument();
    expect(button.type).toEqual('Button');
  });

  // add button renders middle component
});

describe('Unit testing "RequestBody" component', () => {
  const initialState = { testForm: {
    requestType: 'Post',
    assertionList: {},
    i: 0,
    userInput: '',
  } };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    const state = store.getState();
    render(
      <Provider store={store}>
        <RequestBody showField = {state.testForm.requestType === 'Get' ? false : true} />
      </Provider>
    );
  });
  test('Request body textbox renders successfully when requestType is Post, Patch, or Delete', () => {
    expect(screen.getByTestId('Request-Body')).toBeInTheDocument()
  })
})
