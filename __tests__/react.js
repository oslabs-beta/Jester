import React from 'React';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { store } from '../client/store';
import CodeContainer from '../client/containers/CodeContainer';
import ButtonContainer from '../client/containers/ButtonContainer';


// import App from '../client/App';
// import { useAppDispatch, useAppSelector }from '../client/redux/redux-hooks'
import configureStore from 'redux-mock-store'

// jest.mock('../client/redux/redux-hooks')

const initialState = {
  codeOutput: `describe('Sample description', (arg1) => { code.. }`,
};
const mockStore = configureStore()

// const testUseAppSelector = (f) => f(state);

const codeContainer = () => {
  render(
    <Provider store={store}>
      <CodeContainer/>
    </Provider>,
  );
}

// const ButtonComponent = () => {
//   render(
//     <Provider store={store}>
//       <ButtonContainer/>
//     </Provider>,
//   );
// }

// beforeEach(() => {
//   render(<CodeContainer/>);
// })

// beforeEach(() => {
//   useAppSelector.mockImplementation(testUseAppSelector)
// })

// afterEach(() => {
//   // cleanup();
//   jest.clearAllMocks();
// })

describe('Unit testing Output Container components', () => {

  it('Renders placeholder code output in Code Container', () => {
    // codeContainer();
    render(<Provider store={store}><CodeContainer/></Provider>)
    // const linkElement = screen.getByText(/Testing Code/i);
    // expect(linkElement).toBeInTheDocument();
    // const div = document.createElement('div');
    // const component = render(<CodeContainer/>, div);
    // expect(component.container).toMatchSnapshot();
    // console.log(codeComponent);
    // let codeOutput = codeComponent.getByLabelText('Testing Code');
    // expect(codeOutput).toHaveTextContent(`describe('Sample description', (arg1) => { code.. }`);
  });
  

  xtest('Renders copy to clipboard button', () => {
  });

  xtest('Renders copied button', () => {
  });

  xtest('Button onclick changes icon and copies base text to clipboard', () => {
  });

  xtest('State is updated when user types in text box', () => {
    const TYPED_TEXT = 'new user typed text';
    let state = store.setState();
    let codeOutput = screen.getByLabelText('Testing Code');
    expect(codeOutput).toHaveTextContent(TYPED_TEXT);
  });

  xtest('Button onclick copies edited text to clipboard', () => {
  });

})
