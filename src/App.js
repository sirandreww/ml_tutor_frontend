import "App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScrollToTop from "./components/ScrollToTop.js";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import translationsEn from "./translations/translationsEn.json";
import translationsHe from "./translations/translationsHe.json";
import LoadingScreen from "components/LoadingScreen";

const theme = createTheme({});
const Home = lazy(() => import("pages/Home/Home.js"));
const Algorithms = lazy(() => import("pages/algorithms/Algorithms.js"));
const SignIn = lazy(() => import("pages/sign/SignIn.js"));
const GD1 = lazy(() => import("pages/algorithms/gradient_descent/GD1"));
const GD2 = lazy(() => import("pages/algorithms/gradient_descent/GD2"));
const GD3 = lazy(() => import("pages/algorithms/gradient_descent/GD3"));
const GD4 = lazy(() => import("pages/algorithms/gradient_descent/GD4"));
const GD5 = lazy(() => import("pages/algorithms/gradient_descent/GD5"));
const GD6 = lazy(() => import("pages/algorithms/gradient_descent/GD6"));
const GD7 = lazy(() => import("pages/algorithms/gradient_descent/GD7"));
const GD8 = lazy(() => import("pages/algorithms/gradient_descent/GD8"));
const GD9 = lazy(() => import("pages/algorithms/gradient_descent/GD9"));

// lol
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
              <Route path="/" exact element={<Home />} />
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
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
