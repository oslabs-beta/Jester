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
  beforeEach(() => {
    store = mockStore(initialState);
    render(<Provider store={store}><Header/></Provider>)
  })
  test('Header component renders successfully', () => {
    store = mockStore(initialState);
    render(<Provider store={store}><Header/></Provider>)
  })
  xtest('Dropdown menu for request type renders successfully', () => {
    // const dropdown = screen.getByDisplayValue('Get');
    // console.log(dropdown)
    // expect(dropdown.type).toEqual('text');
    // const dropdown = document.querySelector('#request-selector')
    expect(screen.getByText('Get')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Get'));
    fireEvent.click(screen.getByText('Post'));
    expect(screen.getByText('Post')).toBeInTheDocument();

    //userEvent

    
    // console.log(screen.getByText('Get').nextSibling)

    // console.log(document.querySelector('#request-selector'))

    
  })
  xtest('Add assertion button renders successfully', () => {
    expect(screen.getByText('+')).toBeInTheDocument();
    const addAssertionButton = screen.getByText('+');
    expect(addAssertionButton.type).toEqual('button');
  })

  // dropdown menu renders
  // add button renders

});
