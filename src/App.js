import 'App.css';
import React, { Suspense, lazy } from 'react';
import GradientDescent from 'pages/algorithms/gradient_descent/GradientDescent.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './components/ScrollToTop.js';
import AlgorithmsDashboard from 'pages/algorithms/dashboard/AlgorithmsDashboard.js';
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const theme = createTheme({});
const Home = lazy(() => import('pages/Home/Home.js'));
const Algorithms = lazy(() => import('pages/algorithms/Algorithms.js'));
const SignIn = lazy(() => import('pages/sign/SignIn.js'));
// const GD = lazy(() => import('pages/sign/SignIn.js'));
//<AlgorithmsDashboard component={<GradientDescent />} />


function App() {
  useTranslation(['translation']);
  document.body.dir = i18next.dir();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollToTop />
          <Routes >
            <Route path='/' exact element={<Home />} />
            <Route path='/algorithms' element={<Algorithms />} />
            <Route path='/algorithms/gd' element={<AlgorithmsDashboard component={<GradientDescent />} />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </ Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
