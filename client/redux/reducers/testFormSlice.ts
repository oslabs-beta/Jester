import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KeyObject } from 'crypto';

type assertionListType = {
  [index: string]: string,
}
type individualAssertionObject = {
  [key: string]: string
}

type formValuesType = {
  // endpoint? : string,
  // method?: string,
  // req_body?: string,
  // assertions?: individualAssertionObject[],
  [key: string] : (string | Array<individualAssertionObject>),
  assertions: Array<individualAssertionObject>
}

type testFormStateType = {
  requestType: string,
  assertionList: assertionListType,
  i: number,
  userInput: string,
  formValues: formValuesType,
}


const initialState: testFormStateType = {
  requestType: 'Get',
  assertionList: {},
  i: 0,
  userInput: '',
  formValues: { assertions: []},
};

export const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setRequestType: (state: testFormStateType, action: PayloadAction<string>) => {
      state.requestType = action.payload;
    },
    addAssertion: (state: testFormStateType) => {
      state.assertionList[state.i] = 'Status Code';
      state.i += 1;
    },
    setInputType: (state: testFormStateType, action: PayloadAction<{id: string, type: string}>) => {
      state.assertionList[action.payload.id] = action.payload.type;
    },
    deleteAssertion: (state: testFormStateType, action: PayloadAction<string>) => {
      delete state.assertionList[action.payload]
    },
    setFormValues: (state: testFormStateType, action: PayloadAction<{key: string, value: string}>) => {
      if(action.payload.key === 'Content Type' || action.payload.key === 'Status Code' || action.payload.key === 'Response Body') {
          let key: string = action.payload.key;
          if (key === 'Content Type') key = 'content';
          else if (key === 'Status Code') key = 'status';
          else if ( key === 'Response Body') key = 'res_body';
          const value: (string) = action.payload.value
          let found = false;
          for (let obj of state.formValues.assertions) {
            if (obj[key] !== null) {
              obj[key] = value;
              found = true;
            }
          }
          const newObj: individualAssertionObject = {}
          newObj[key] = value;
          if (!found) state.formValues.assertions.push(newObj);
      } else {
        state.formValues[action.payload.key] = action.payload.value
        if (state.formValues.method) {
          if (state.formValues.method === 'Get') {
            if (state.formValues['req_body']) delete state.formValues['req_body'];
          }
        }
      }
    }
  },
});

export const {
  setRequestType,
  addAssertion,
  setInputType,
  deleteAssertion,
  setFormValues,
} = testFormSlice.actions;

export default testFormSlice.reducer;
