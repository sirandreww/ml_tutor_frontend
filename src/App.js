import './App.css';
import Navbar from './components/Navbar.js';
import React from 'react';
import Home from './components/pages/Home';
import Service from './components/pages/Service';
import Algorithms from './components/algorithms/GradientDescent.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      </Router>
    </div>
  );
}

export default App;
