import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  boilerplate_start,
  BOILERPLATE_END,
  DEFAULT_CLIPBOARD,
  INDENT,
} from '../../constants';
import { clipboardStateType, postSnippetPayload } from '../../types';

const initialState: clipboardStateType = {
  server: '',
  codeSnippets: [],
  codeDisplay: DEFAULT_CLIPBOARD,
};

const updateCodeDisplay = (state: clipboardStateType) => {
  if (state.codeSnippets.length) {
    let codeSnips = state.codeSnippets;
    codeSnips = codeSnips.map((snippet) =>
      snippet
        .split('\n')
        .map((line) => INDENT + line)
        .join('\n')
    );

    const codeArr = [
      ...boilerplate_start(state.server),
      ...codeSnips.map((snippet) => snippet + '\n'),
      BOILERPLATE_END,
    ];
    state.codeDisplay = codeArr.join('');
  } else if (state.codeSnippets.length === 0)
    state.codeDisplay = DEFAULT_CLIPBOARD;
};

export const clipboardSlice = createSlice({
  name: 'clipboard',
  initialState,
  reducers: {
    appendToClipboard: (
      state: clipboardStateType,
      action: PayloadAction<string>
    ) => {
      state.codeSnippets.push(action.payload);
      updateCodeDisplay(state);
    },
    copyClipboard: (state: clipboardStateType) => {
      navigator.clipboard.writeText(state.codeDisplay);
    },
    setServer: (state: clipboardStateType, action: PayloadAction<string>) => {
      state.server = action.payload;
      updateCodeDisplay(state);
    },
    clearClipboardState: (state: clipboardStateType) => {
      state.server = '';
      state.codeSnippets = [];
      state.codeDisplay = DEFAULT_CLIPBOARD;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSnippets.fulfilled,
        (state: clipboardStateType, action: any) => {
          state.codeSnippets = action.payload.data;

          updateCodeDisplay(state);
        }
      );
  },
});

const thunks = {
  postSnippet: createAsyncThunk(
    'clipboardSlice/postSnippet',
    async (payload: postSnippetPayload) => {
      const { projectId, codeOutput } = payload;
      let response;
      try {
        response = await axios.post(`/api/clipboard/${projectId}`, {
          code_snippet: codeOutput,
        });
      } catch (error) {
        console.log('clipboardSlice/postSnippet', error);
      }
    }
  ),
  getSnippets: createAsyncThunk(
    'clipboardSlice/getSnippets',
    async (projectId: number) => {
      let response;
      try {
        response = await axios.get(`/api/clipboard/${projectId}`);
      } catch (error) {
        console.log('clipboardSlice/getSnippets', error);
      }
      return response;
    }
  ),
};

export const {
  appendToClipboard,
  copyClipboard,
  setServer,
  clearClipboardState,
} = clipboardSlice.actions;

export const { postSnippet, getSnippets } = thunks;

export default clipboardSlice.reducer;
