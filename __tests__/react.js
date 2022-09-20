import React from 'React';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import {Header} from '../client/components/Header'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'



describe('Unit testing React components', () => {
  const initialState = {testForm: {requestType: 'Get', assertionList: []}};
  const mockStore = configureStore()
  let store
  test('Header components renders successfully', () => {
    store = mockStore(initialState);
    render(<Provider store={store}><Header/></Provider>)
  })
});
