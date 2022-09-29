import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import NotFound from './pages/NotFound';
import { NavPanelContainer } from './containers/NavPanelContainer';
import { Box } from '@mui/material';
import { CodeGenerator } from './pages/CodeGenerator';
import ClipBoard from './components/ClipBoard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E17EB',
      contrastText: '#fff'
    },
    secondary: {
      main: '#606F7B',
      contrastText: '#fff'
    }
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 5fr',
          marginTop: '10px',
        }}
      >
        <NavPanelContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clipboard/:projectId" element={<ClipBoard />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route
            path="/CodeGenerator/:projectId"
            element={<CodeGenerator />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
