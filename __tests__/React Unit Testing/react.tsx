import React from 'React';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import CodeContainer from '../../client/containers/CodeContainer';
import ButtonContainer from '../../client/containers/ButtonContainer';
import AppButton from '../../client/components/AppButton';
import { Header } from '../../client/components/Header';
import { ProjectDropdown } from '../../client/components/ProjectDropdown';
import { setRequestType } from '../../client/redux/reducers/testFormSlice';

import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import { RequestBody } from '../../client/components/RequestBody';
import { DEFAULT_PROJECT } from '../../client/constants';


const initialState = {
  slice: {
    codeOutput: 'describe(\'Sample description\')',
  },
  userInfo: {
    isLoggedIn: false,
  }
};

const clickedState = {
  slice: {
    doneIcon: true,
  },
  userInfo: {
    isLoggedIn: false,
  }
};

const mockStore = configureStore();

const code = () => {
  render(
    <Provider store={ mockStore(initialState) }>
      <CodeContainer />
    </Provider>
  );
};

const button = () => {
  render(
    <Provider store={ mockStore(initialState) }>
      <ButtonContainer />
    </Provider>
  );
};

const props = {
  start: <AddBoxIcon/>,
  end : <DoneAllIcon/>,
  onClick: jest.fn(),
  testId: 'bttn-append',
};

const appButton = () => {
  render(
    <AppButton 
      { ...props }
    />
  );
};

const buttonDone = () => {
  render(
    <Provider store={ mockStore(clickedState) }>
      <ButtonContainer/>
    </Provider>,
  );
};

describe('Unit testing output Code Container components', () => {
  beforeAll(() => {
    // button();
    // const buttons = screen.getAllByRole('button');
  });

  test('Renders placeholder code output in Code Container', () => {
    code();
    const codeOutput = screen.getByLabelText('Testing Code');
    expect(codeOutput.innerHTML).toEqual('describe(\'Sample description\')');
  });
  
  test('Renders two buttons', () => {
    button();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('Renders copy to navigator clipboard button', () => {
    button();
    expect(screen.getByTestId('bttn-copy')).toBeInTheDocument();
  });

  test('Renders ContentCopyIcon inside copy to clipboard button', () => {
    button();
    const bttn = screen.getByTestId('bttn-copy');
    const icon = bttn.innerHTML.includes('data-testid="ContentCopyIcon"');
    expect(icon).toBeTruthy();
  });

  test('Renders DoneAllIcon on state change', () => {
    buttonDone();
    const bttn = screen.getByTestId('bttn-copy');
    const icon = bttn.innerHTML.includes('data-testid="DoneAllIcon"');
    expect(icon).toBeTruthy();
  });

  test('Renders append to app clipboard button', () => {
    button();
    expect(screen.getByTestId('bttn-append')).toBeInTheDocument();
  });

  test('Renders AddBoxIcon inside append to app clipboard button', () => {
    button();
    const bttn = screen.getByTestId('bttn-append');
    const icon = bttn.innerHTML.includes('data-testid="AddBoxIcon"');
    expect(icon).toBeTruthy();
  });
  
  test('Append clipboard button OnClick renders DoneAllIcon and fires onClick function', () => {
    appButton();
    let bttn = screen.getByRole('button', { name: '' });
    fireEvent.click(bttn);
    bttn = screen.getByRole('button', { name: '' });
    const icon = bttn.innerHTML.includes('data-testid="DoneAllIcon"');
    expect(icon).toBeTruthy();
    expect(props.onClick).toHaveBeenCalled();
  });
});

describe('Unit testing "Header" component', () => {
  const initialState = { 
    testForm: {
      requestType: 'Get',
      assertionList: {},
      i: 0,
      userInput: '',
    },
    userInfo: { 
      projectsInfo: [
        {
          project_id: 0,
          project_name: DEFAULT_PROJECT,
          user_id: 0,
          showAccessClipboard: false,
        },
      ],
      currentProject: DEFAULT_PROJECT }
  };

  const mockStore = configureStore();
  let store: any;

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
    await (() => userEvent.click(screen.getByText(/Post/i)));
    expect(await screen.getByText('Post')).toBeInTheDocument();
  });

  test('Add assertion button renders successfully', () => {
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByRole('button', {name : '+'})).toBeInTheDocument();
  });

  test('Endpoint textbox renders successfully', () => {
    expect(screen.getByRole('textbox', {name: 'Endpoint'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Endpoint'}).id).toEqual('endpoint');
  });

  xtest('Add button renders middle component', () => {
    fireEvent.click(screen.getByText('+'));
    const dropdown = screen.getByLabelText('Test Option');
    expect(dropdown).toBeInTheDocument();
    const textbox = screen.getByLabelText('User Input');
    expect(textbox).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'User Input'})).toBeInTheDocument();
    const button = screen.getByText('-');
    expect(button).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: '-'})).toBeInTheDocument();
  });

  // add button renders middle component

  test('Dropdown menu for project renders successfully', async () => {
    render(
      <Provider store={store}>
        <ProjectDropdown />
      </Provider>
    );
    const dropdown = screen.getByRole('button', { name: 'Project One' });
    expect(dropdown).toBeInTheDocument();
  });

  xtest('Generate Test Code button renders successfully', () => {
    // Is that for Lilah?
  });
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
    expect(screen.getByTestId('Request-Body')).toBeInTheDocument();
  });

});
