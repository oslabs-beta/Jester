import React from 'React';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, within } from '@testing-library/react';
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
  });
  test('Header component renders successfully', () => {
    store = mockStore(initialState);
    render(<Provider store={store}><Header/></Provider>)
  });
  // test('Dropdown menu for request type renders successfully', async () => {
  test('Dropdown menu for request type renders successfully', () => {

    // [x] Tried to set the innerHTML property of bttn
    // [x] Tried to select the elements using getByTestId, getDisplayValue

    // https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component
    // Based on the above stackoverflow, the general idea for testing is to:
    //  1. select the button
    //  2. fire the mouseDown event, which brings up the listbox
    //  3. then select the Post li element from the listbox
    
    // Select the dropdown button from the screen
    let button = screen.getByRole('button', {name: 'Get'});
    // Fire the mouseDown event on the button
    fireEvent.mouseDown(button);
    // The listbox is only accessible after the mouseDown event is fired on button
    const listbox = screen.getByRole('listbox', {name: ""});
    let li = screen.getByText(/Post/i);
    // ! This user event seems not to be working. either the click method is wrong or the element passed in is wrong
    fireEvent.click(screen.getByText(/Post/i)); // Does not work!!!!!!!!
    // userEvent.click(screen.getByText(/Post/i)); // X
    // fireEvent.mouseDown(screen.getByText(/Post/i)); // X

    // The code errors out if we call getByText on listbox
    // fireEvent.click(listbox.getByText(/Post/i));
    
    // the queries for Get should fail
    // button = screen.getByRole('button', {name: 'Get'})
    
    // This fails because the button element is no longer on the screen???
    // button = screen.getByRole('button', {name: 'Post'})

    li = screen.getByText(/Post/i)
    // li = screen.getByText(/Get/i)

    // Placeholder to stop debugger here
    const b = 'a'

    // userEvent.click(screen.getByRole('button', {name: 'Get'}));
    // await (() => UserEvent.click(screen.getByText(/Post/i)));
    // expect(await screen.getByText('Post')).toBeInTheDocument();

  //   console.log(screen.getByLabel('Request Type'))
    
  // fireEvent.change(screen.getByLabelText('Request Type'), { target: { value: 'Post' } })
  // let options = screen.getAllByTestId('request-selector')
  // expect(options[1].selected).toBeTruthy();

    // expect(screen.getByText('Get')).toBeInTheDocument();
    // userEvent.click(screen.getByTestId('request-selector'));
    // userEvent.click(await screen.getByTestId('Post'));


    //userEvent



    // expect(getByTestId('Post').selected).toBe(true);


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
