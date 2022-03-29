// import React from "react";
import React from 'react';
import { Suspense, lazy } from "react";
import "App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScrollToTop from "./components/ScrollToTop";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import translationsEn from "./translations/translationsEn.json";
import translationsHe from "./translations/translationsHe.json";
import LoadingScreen from "components/LoadingScreen";

import Home from "pages/Home/Home";
// import Algorithms from "pages/algorithms/Algorithms.js";
// import SignIn from "pages/sign/SignIn.js";
// import GD1 from "pages/algorithms/gradient_descent/GD1";
// import GD2 from "pages/algorithms/gradient_descent/GD2";
// import GD3 from "pages/algorithms/gradient_descent/GD3";
// import GD4 from "pages/algorithms/gradient_descent/GD4";
// import GD5 from "pages/algorithms/gradient_descent/GD5";
// import GD6 from "pages/algorithms/gradient_descent/GD6";
// import GD7 from "pages/algorithms/gradient_descent/GD7";
// import GD8 from "pages/algorithms/gradient_descent/GD8";
// import GD9 from "pages/algorithms/gradient_descent/GD9";
// import LR1 from "pages/algorithms/linear_regression/LR1";
// const Home = lazy(() => import("pages/Home/Home.js"));
const Algorithms = lazy(() => import("pages/algorithms/Algorithms"));
const SignIn = lazy(() => import("pages/sign/SignIn"));
const GD1 = lazy(() => import("pages/algorithms/gradient_descent/GD1"));
const GD2 = lazy(() => import("pages/algorithms/gradient_descent/GD2"));
const GD3 = lazy(() => import("pages/algorithms/gradient_descent/GD3"));
const GD4 = lazy(() => import("pages/algorithms/gradient_descent/GD4"));
const GD5 = lazy(() => import("pages/algorithms/gradient_descent/GD5"));
const GD6 = lazy(() => import("pages/algorithms/gradient_descent/GD6"));
const GD7 = lazy(() => import("pages/algorithms/gradient_descent/GD7"));
const GD8 = lazy(() => import("pages/algorithms/gradient_descent/GD8"));
const GD9 = lazy(() => import("pages/algorithms/gradient_descent/GD9"));
const LR1 = lazy(() => import("pages/algorithms/linear_regression/LR1"));

const theme = createTheme({});

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    he: { translation: translationsHe },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  useTranslation(["translation"]);
  document.body.dir = i18next.dir();

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="/algorithms/gd1" element={<GD1 />} />
              <Route path="/algorithms/gd2" element={<GD2 />} />
              <Route path="/algorithms/gd3" element={<GD3 />} />
              <Route path="/algorithms/gd4" element={<GD4 />} />
              <Route path="/algorithms/gd5" element={<GD5 />} />
              <Route path="/algorithms/gd6" element={<GD6 />} />
              <Route path="/algorithms/gd7" element={<GD7 />} />
              <Route path="/algorithms/gd8" element={<GD8 />} />
              <Route path="/algorithms/gd9" element={<GD9 />} />
              <Route path="/algorithms/lr1" element={<LR1 />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
