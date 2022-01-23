import "App.css";
import React, { Suspense, lazy } from "react";
import GradientDescent from "pages/algorithms/gradient_descent/GradientDescent.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScrollToTop from "./components/ScrollToTop.js";
import AlgorithmsDashboard from "pages/algorithms/dashboard/AlgorithmsDashboard.js";
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
// const GD = lazy(() => import('pages/sign/SignIn.js'));
//<AlgorithmsDashboard component={<GradientDescent />} />

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
              <Route
                path="/algorithms/gd"
                element={
                  <AlgorithmsDashboard component={<GradientDescent />} />
                }
              />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
