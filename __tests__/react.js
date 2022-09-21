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
    // const dropdown = screen.getByDisplayValue('Get');
    // console.log(dropdown)
    // expect(dropdown.type).toEqual('text');
    // const dropdown = document.querySelector('#request-selector')

    // getByTestId and screen.getByTestId('request-selector')

    // [x] Tried to set the innerHTML property of bttn
    // const select = screen.getByRole('select', {name: 'Get'});
    // bttn.innerHTML = 'Post'
    // bttn = screen.getByRole('button', {name: 'Post'});
    // const bttn2 = screen.getByRole('button', { expanded: true });
    // const drop = screen.getByTestId('request-selector');
    // let input0 = screen.getByDisplayValue('Get');
    // userEvent.selectOptions(screen.getByTestId('request-selector'), 'Post');
    // userEvent.selectOptions(bttn, 'Post');
    
    // https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component
    
    // Select the dropdown button from the screen
    let bttn = screen.getByRole('button', {name: 'Get'});
    fireEvent.mouseDown(bttn);
    // The listbox is only accessible after the mouseDown event is fired on button
    const listbox = screen.getByRole('listbox', {name: ""});

    // const listbox = getByRole('listbox');
    // const listbox = within(getByRole('listbox', {name: ""}));
    const a = 'a'
    // screen.getByText(/Post/i)
    // listbox.getByText('Post')
    // listbox.getByDisplayValue(/Post/i)
    // listbox.getByDisplayValue('Post')
    // listbox.getByLabelText(/Post/i)
    // const z = screen.getByText(/Post/i)
    // fireEvent.click(screen.getByText(/Delete/i));
    // userEvent.click(screen.getByText(/Post/i));
    fireEvent.click(listbox.getByText(/Post/i));
    
    bttn = screen.getByRole('button', {name: 'Get'})
    bttn = screen.getByRole('button', {name: 'Post'})
    bttn = screen.getByText(/Post/i)
    bttn = screen.getByText(/Get/i)

    // input0 = screen.getByDisplayValue('Get');
    // userEvent.click(screen.getByRole('button', {name: 'Get'}));
    // await (() => UserEvent.click(screen.getByText(/Post/i)));
    // expect(await screen.getByText('Post')).toBeInTheDocument();

  //   console.log(screen.getByLabel('Request Type'))
    const b = 'a'
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
