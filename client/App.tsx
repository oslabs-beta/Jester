import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Clipboard from './pages/Clipboard';
import Documentation from './pages/Documentation';
import NotFound from './pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E17EB',
      contrastText: '#fff'
    }
  },
  typography: {
    // fontFamily: [
    //   'Source Code Pro',
    //   'monospace',
    // ].join(','),
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clipboard' element={<Clipboard />} />
        <Route path='/documentation' element={<Documentation />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
