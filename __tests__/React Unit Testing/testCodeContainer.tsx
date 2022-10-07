import '@testing-library/jest-dom';
import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import CodeContainer from '../../client/containers/CodeContainer';
import ButtonContainer from '../../client/containers/ButtonContainer';
import AppButton from '../../client/components/AppButton';


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