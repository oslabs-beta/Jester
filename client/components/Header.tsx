import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setRequestType,
  addAssertion,
  setFormValues,
} from '../redux/reducers/testFormSlice';
import { setCodeOutput } from '../redux/reducers/reducer';
import { setErrorMsg } from '../redux/reducers/userInputSlice';
import { Middle } from './Middle';
import { RequestBody } from './RequestBody';
import { ChangeEvent } from 'react';
import axios from 'axios';
import { AnySet } from 'immer/dist/internal';
import { request } from 'https';

export const Header = () => {
  const requestType = useAppSelector((state) => state.testForm.requestType);
  const formValues = useAppSelector((state) => state.testForm.formValues);
  const assertionObject = useAppSelector(
    (state) => state.testForm.assertionList
  );
  const assertionList: JSX.Element[] = [];
  const assertionIds = Object.keys(assertionObject);
  for (let id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />);
  }
  const dispatch = useAppDispatch();


  const getData = (form: any) => {
    const formData = new FormData(form);
    return (Object.fromEntries(formData));
  }


  const handleSubmit = async (
    e: React.FormEvent<EventTarget>
  ): Promise<unknown> => {
    e.preventDefault();
    console.log(document.getElementById('test-generator-form'))
    const formValues = getData(e.target);
    console.log('formValues: ', formValues);

  console.log(typeof formValues['request-selector'])
    const method = formValues['request-selector'].toString();
    const endpoint = formValues[method].toString();
    const req_body = formValues['Request-Body'].toString();
    const contentAssertion = formValues['Content Type'].toString();
    const statusAssertion = formValues['Status Code'].toString();
    const res_body = formValues['Response Body'].toString();

    type requestBodyType = {
      header: {
        method?: string, endpoint?: string, req_body?: string
      },
      assertions: {}[]
    }

    const requestBody: requestBodyType = {header: {}, assertions: []};
    if (method) requestBody.header['method'] = method;
    if (endpoint) requestBody.header['endpoint'] = endpoint
    if (req_body) requestBody.header['req_body'] = req_body
    if (contentAssertion) requestBody.assertions.push({content: contentAssertion});
    if (statusAssertion) requestBody.assertions.push({status: statusAssertion});
    if (res_body) requestBody.assertions.push({res_body: res_body});
    
    const response = await axios.post('/api/tests', requestBody);
    dispatch(setCodeOutput(response.data));


    
    // {
    //   header: {
    //             endpoint : '/',
    //             method: 'POST'
    //             req_body: {a:1} // Needed for POST and PATCH, optional for DELETE
    //   },
    //   assertions: [
    //                 { content: '/text\/html/' },
    //                 { status: 200 },
    //                 { res_body: { a: 'b' } }
    //                 ...
    //   ]
    // }

    // const assertions = formValues.assertions;
    // if (assertions.length === 0) alert('Please add your expected response!');
    // else {
    //   const newAssertions = [];
    //   for (let [key, value] of Object.entries(assertions[0])) {
    //     const obj: any = {};
    //     obj[key] = value;
    //     newAssertions.push(obj);
    //   }
    //   const requestBody = {
    //     header: formValues.header,
    //     assertions: newAssertions,
    //   };
    //   console.log(requestBody);
    //   const response = await axios.post('/api/tests', requestBody);
    //   dispatch(setCodeOutput(response.data));
    // }
    return;
  };
  const handleRequestChange = (e: SelectChangeEvent<string>) => {
    dispatch(setRequestType(e.target.value));
    dispatch(setFormValues({ key: 'method', value: e.target.value }));
  };
  const handleFormValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch(setFormValues({ key: e.target.id, value: e.target.value }));
  const handleChange = (e: SelectChangeEvent<string>) =>
    dispatch(setRequestType(e.target.value));
  const handleAdd = () => {
    dispatch(addAssertion());
    dispatch(setErrorMsg());
  };

  const menuItems: JSX.Element[] = [];
  const menuOptions = ['Get', 'Post', 'Patch', 'Delete'];
  for (let option of menuOptions) {
    menuItems.push(
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    );
  }

  return (
    <form id="test-generator-form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FormControl>
          <InputLabel id="requestSelector">Request Type</InputLabel>
          <Select
            name="request-selector"
            id="request-selector"
            data-testid="request-selector"
            label="Request Type"
            value={requestType}
            onChange={handleRequestChange}
            sx={{ width: '100px' }}
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label="Endpoint"
          data-testid={requestType}
          id="endpoint"
          name={requestType}
          onChange={handleFormValueChange}
          required
        />
        <RequestBody showField={requestType === 'Get' ? false : true} />
      </Box>
      <Box
        id="assertion-list"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '10px',
          marginTop: '10px',
        }}
      >
        {assertionList}
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography>Add expected response:</Typography>
          <Button
            id="add-assertion"
            name="add-assertion"
            variant="contained"
            onClick={handleAdd}
            sx={{ justifySelf: 'center', alignSelf: 'center' }}
          >
            +
          </Button>
        </Box>
      </Box>
      <Button type="submit" variant="text" sx={{ backgroundColor: '#E6E6FA' }}>
        Generate Test Code
      </Button>
    </form>
  );
};
