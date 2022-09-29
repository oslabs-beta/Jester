import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  InputLabel,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setRequestType, addAssertion } from '../redux/reducers/testFormSlice';
import { setCodeOutput } from '../redux/reducers/reducer';
import { setErrorMsg } from '../redux/reducers/userInputSlice';
import { Middle } from './Middle';
import { RequestBody } from './RequestBody';
import { ChangeEvent } from 'react';
import axios from 'axios';

export const Header = () => {
  const requestType = useAppSelector((state) => state.testForm.requestType);
  const assertionObject = useAppSelector(
    (state) => state.testForm.assertionList
  );
  const assertionList: JSX.Element[] = [];
  const assertionIds = Object.keys(assertionObject);
  for (const id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />);
  }
  const dispatch = useAppDispatch();

  const getData = (form: any) => {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
  };

  const handleSubmit = async (
    e: React.FormEvent<EventTarget>
  ): Promise<unknown> => {
    e.preventDefault();
    let statusCount = 0;
    let contentCount = 0;
    const assertionVals = Object.values(assertionObject);
    assertionVals.forEach((val) => {
      if (val === 'Status Code') statusCount++;
      if (val === 'Content Type') contentCount++;
    });

    if (statusCount > 1)
      return alert('Make sure that you have only one Status Code!');
    if (contentCount > 1)
      return alert('Make sure that you have only one Content Type!');

    const formValues = getData(e.target);

    const method = formValues['request-selector'].toString();
    const endpoint = formValues[method].toString();
    const req_body = formValues['Request-Body'];
    const contentAssertion = formValues['Content Type'];
    const statusAssertion = formValues['Status Code'];
    const res_body = formValues['Response Body'];

    if (!contentAssertion && !statusAssertion && !res_body)
      return alert('Please add expected response!');

    type requestBodyType = {
      header: {
        method?: string;
        endpoint?: string;
        req_body?: string;
      };
      assertions: {}[];
    };

    const requestBody: requestBodyType = { header: {}, assertions: [] };
    if (method) requestBody.header['method'] = method;
    if (endpoint) requestBody.header['endpoint'] = endpoint;
    if (req_body) requestBody.header['req_body'] = req_body.toString();
    if (contentAssertion)
      requestBody.assertions.push({ content: contentAssertion.toString() });
    if (statusAssertion)
      requestBody.assertions.push({ status: statusAssertion.toString() });
    if (res_body)
      requestBody.assertions.push({ res_body: res_body.toString() });

    const response = await axios.post('/api/tests', requestBody);
    dispatch(setCodeOutput(response.data));

    return;
  };
  const handleRequestChange = (e: SelectChangeEvent<string>) => {
    dispatch(setRequestType(e.target.value));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch(setRequestType(e.target.value));
  const handleAdd = () => {
    dispatch(addAssertion());
    dispatch(setErrorMsg());
  };

  const menuItems: JSX.Element[] = [];
  const menuOptions = ['Get', 'Post', 'Patch', 'Delete'];
  for (const option of menuOptions) {
    menuItems.push(
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    );
  }

  return (
    <form id='test-generator-form' onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          mb: 2,
        }}
      >
        <FormControl>
          <InputLabel id='requestSelector'>Request Type</InputLabel>
          <Select
            name='request-selector'
            id='request-selector'
            data-testid='request-selector'
            label='Request Type'
            value={requestType}
            onChange={handleRequestChange}
            sx={{ height: 40 , width: '100px' }}
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label='Endpoint'
          data-testid={requestType}
          id='endpoint'
          name={requestType}
          required
          size="small"
        />
        <RequestBody showField={requestType === 'Get' ? false : true} />
      </Box>
      <Box
        id='assertion-list'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '10px',
          marginTop: '10px'
        }}
      >
        {assertionList}
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Typography>Add Expected Response:</Typography>
          <Button
            id='add-assertion'
            name='add-assertion'
            variant='contained'
            color='secondary'
            onClick={handleAdd}
            sx={{ justifySelf: 'center', alignSelf: 'center', height: 35 }}
            disableElevation
          >
            +
          </Button>
        </Box>
      </Box>
      <Button
        type='submit'
        variant='contained'
        sx={{ marginTop: '30px', height: 40 }}
        disableElevation
      >
        Generate Test Code
      </Button>
    </form>
  );
};
