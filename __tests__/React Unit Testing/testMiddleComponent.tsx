// import React from 'React';
// import { Provider } from 'react-redux';
// import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import configureStore from 'redux-mock-store';

// import '@testing-library/jest-dom';

// import { Middle } from '../../client/components/Middle';

// // should display correct assertion type on change
// // should send user input to state(?)
// // delete button -> component should not be in the document



// describe('Unit testing Middle component', () => {
//   const initialState = { userInput: {
//     errorMsgs: {},
//     userInputType: '',
//     userInputText: undefined,
//     i: 0,
//   } };
//   const mockStore = configureStore();
//   let store;
//   beforeEach(() => {
//     store = mockStore(initialState);
//   });
//   const state = store.getState();
//   render(
//     <Provider store={store}>
//       <Middle id='mockTestId'/> 
//     </Provider>
//   );
// });