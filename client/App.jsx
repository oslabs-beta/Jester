import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { store } from './store'
import CodeContainer from './containers/CodeContainer'
import ButtonContainer from './containers/ButtonContainer'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

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

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <NavBar/>
          <CodeContainer/>
          <ButtonContainer/>
          <Footer/>
      </Provider>
    </ThemeProvider>
  );        
};

export default App;