import '@testing-library/jest-dom';

import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { fireEvent, render, screen } from '@testing-library/react';

import AppButton from '../../client/components/AppButton';
import ButtonContainer from '../../client/containers/ButtonContainer';
import CodeContainer from '../../client/containers/CodeContainer';

const initialState = {
  code: {
    codeOutput: 'describe(\'Sample description\')',
  },
  userInfo: {
    currentProjectId: 0, 
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

describe('Unit testing output Code Container components', () => {
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

  test('Renders DoneAllIcon on button click', () => {
    const props = {
      start: <ContentCopyIcon />,
      end: <DoneAllIcon />,
      onClick: jest.fn(),
      testId: 'bttn-copy',
    };
    render(<AppButton {...props} />);

    let bttn = screen.getByTestId('bttn-copy');
    fireEvent.click(bttn);
    bttn = screen.getByTestId('bttn-copy');
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

  test('Append clipboard button onClick renders DoneAllIcon and fires onClick function', () => {
    const props = {
      start: <AddBoxIcon />,
      end: <DoneAllIcon />,
      onClick: jest.fn(),
      testId: 'bttn-append',
    };
    render(<AppButton {...props} />);

    let bttn = screen.getByRole('button', { name: 'Add to Project' });
    fireEvent.click(bttn);
    bttn = screen.getByRole('button', { name: 'Add to Project' });
    const icon = bttn.innerHTML.includes('data-testid="DoneAllIcon"');
    expect(icon).toBeTruthy();
    expect(props.onClick).toHaveBeenCalled();
  });
});
