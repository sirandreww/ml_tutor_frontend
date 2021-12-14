import './App.css';
import Navbar from './components/Navbar.js';
import React from 'react';
import Home from './components/pages/Home';
import Service from './components/pages/Service';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Navbar />
        <Routes >
          <Route path='/' exact element={<Home/>} />
          <Route path='/service' element={<Service/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
