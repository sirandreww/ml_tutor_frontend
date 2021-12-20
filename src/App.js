import 'App.css';
import Navbar from 'components/Navbar.js';
import React from 'react';
import Home from 'pages/Home.js';
import Service from 'pages/Service';
import Algorithms from 'pages/algorithms/GradientDescent.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from 'components/Footer';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Navbar />
        <Routes >
          <Route path='/' exact element={<Home/>} />
          <Route path='/service' element={<Service/>} />
          <Route path='/algorithms/gd' element={<Algorithms />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
