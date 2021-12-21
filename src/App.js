import 'App.css';
import Navbar from 'components/Navbar.js';
import React from 'react';
import Home from 'pages/Home/Home.js';
import Service from 'pages/Service';
import Algorithms from 'pages/algorithms/GradientDescent.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from 'components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Routes >
          <Route path='/' exact element={<Navbar position="fixed" />} />
          <Route path='/service' element={<Navbar position="static" />} />
          <Route path='/algorithms/gd' element={<Navbar position="static" />} />
        </Routes>
        
        <Routes >
          <Route path='/' exact element={<Home />} />
          <Route path='/service' element={<Service />} />
          <Route path='/algorithms/gd' element={<Algorithms />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
