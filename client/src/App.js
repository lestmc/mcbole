import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ThemeProvider } from './contexts/ThemeContext';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Resources from './components/Resources';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/Profile';
import Settings from './components/Settings';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './components/admin/AdminLayout';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App; 