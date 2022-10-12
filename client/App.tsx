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
import Clipboard from './components/Clipboard';
import Auth from './pages/Auth';
import { Contributors } from './pages/Contributors';
import { useAppSelector } from './redux/hooks';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6E00BB',
      contrastText: '#fff'
    },
    secondary: {
      main: '#606F7B',
      contrastText: '#fff'
    },
    info: {
      main: '#8795A1',
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
  const showProjectPanel = useAppSelector((state) => state.navPanel.showProjectPanel);
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box
        className="contents"
        sx={{
          display: 'grid',
          gridTemplateColumns: showProjectPanel ? '1fr 5fr' : '1fr 11fr',
          height: '100%',
        }}
      >
        <NavPanelContainer />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clipboard/:projectId" element={<Clipboard />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path='/contributors' element={<Contributors />} />
            <Route path='/authenticate' element={<Auth />} />
            <Route
              path="/CodeGenerator/:projectId"
              element={<CodeGenerator />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default App;
