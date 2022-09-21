import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Header } from './components/Header';
import CodeContainer from './containers/CodeContainer'
import ButtonContainer from './containers/ButtonContainer'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E17EB',
      contrastText: '#fff'
    },
  },
  typography: {
    // fontFamily: [
    //   'Source Code Pro',
    //   'monospace',
    // ].join(','),
  },
});


const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <Header />
        <CodeContainer />
        <ButtonContainer />
    </ThemeProvider>
  );        
};

export default App;