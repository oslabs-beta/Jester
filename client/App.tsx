import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Clipboard } from './components/Clipboard';
import { Footer } from './components/Footer';
import { Navbar } from './components/NavBar';
import { NavPanelContainer } from './containers/NavPanelContainer';
import { Auth } from './pages/Auth';
import { CodeGenerator } from './pages/CodeGenerator';
import { Contributors } from './pages/Contributors';
import { Documentation } from './pages/Documentation';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
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
});

const App = () => {
  const showProjectPanel = useAppSelector((state) => state.navPanel.showProjectPanel);
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
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
