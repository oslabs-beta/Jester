import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Header } from './components/Header';
import CodeContainer from './containers/CodeContainer'
import ButtonContainer from './containers/ButtonContainer'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { PageContainer } from './containers/PageContainer';

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
      <NavBar />
      <PageContainer />
      <Footer />
    </ThemeProvider>
  );        
};

export default App;