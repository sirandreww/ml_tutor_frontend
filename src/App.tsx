// import React from "react";
import React from 'react';
import { Box } from '@mui/material';
import { Suspense, lazy } from "react";
import "App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScrollToTop from "components/ScrollToTop";
import { useTranslation } from "react-i18next";
// @ts-ignore
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import translationsEn from "./translations/translationsEn.json";
import translationsHe from "./translations/translationsHe.json";
import LoadingScreen from "components/LoadingScreen";
import { ErrorBoundary } from 'react-error-boundary';

const Home                = lazy(() => import("pages/Home"));
const Algorithms          = lazy(() => import("pages/Algorithms"));
const SomethingWentWrong  = lazy(() => import("pages/SomethingWentWrong"));
const ContactUs           = lazy(() => import("pages/ContactUs"));
const SignIn              = lazy(() => import("pages/SignIn"));

// ------------------------ GD ------------------------  
const GD1 = lazy(() => import("pages/algorithms/gradient_descent/GD1"));
const GD2 = lazy(() => import("pages/algorithms/gradient_descent/GD2"));
const GD3 = lazy(() => import("pages/algorithms/gradient_descent/GD3"));
const GD4 = lazy(() => import("pages/algorithms/gradient_descent/GD4"));
const GD5 = lazy(() => import("pages/algorithms/gradient_descent/GD5"));
const GD6 = lazy(() => import("pages/algorithms/gradient_descent/GD6"));
const GD7 = lazy(() => import("pages/algorithms/gradient_descent/GD7"));
const GD8 = lazy(() => import("pages/algorithms/gradient_descent/GD8"));

// ------------------------ Linear regression ------------------------  
const LR1 = lazy(() => import("pages/algorithms/linear_regression/LR1"));
const LR2 = lazy(() => import("pages/algorithms/linear_regression/LR2"));
const LR3 = lazy(() => import("pages/algorithms/linear_regression/LR3"));
const LR4 = lazy(() => import("pages/algorithms/linear_regression/LR4"));
const LR5 = lazy(() => import("pages/algorithms/linear_regression/LR5"));
const LR6 = lazy(() => import("pages/algorithms/linear_regression/LR6"));

// ------------------------ Logistic regression ------------------------  
const LogReg1 = lazy(() => import("pages/algorithms/logistic_regression/LogReg1"));
const LogReg2 = lazy(() => import("pages/algorithms/logistic_regression/LogReg2"));
const LogReg3 = lazy(() => import("pages/algorithms/logistic_regression/LogReg3"));
const LogReg4 = lazy(() => import("pages/algorithms/logistic_regression/LogReg4"));
const LogReg5 = lazy(() => import("pages/algorithms/logistic_regression/LogReg5"));
const LogReg6 = lazy(() => import("pages/algorithms/logistic_regression/LogReg6"));
const LogReg7 = lazy(() => import("pages/algorithms/logistic_regression/LogReg7"));

// ------------------------ Neural Network ------------------------ 
const NN1 = lazy(() => import("pages/algorithms/neural_network/NN1"));
const NN2 = lazy(() => import("pages/algorithms/neural_network/NN2"));
const NN3 = lazy(() => import("pages/algorithms/neural_network/NN3"));


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
    <ErrorBoundary
      FallbackComponent={SomethingWentWrong}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <ScrollToTop />
              <Box // this is here to allow the footer to stick to the bottom
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/algorithms" element={<Algorithms />} />
                  <Route path="/contact" element={<ContactUs />} />

                  {/* ------------------------ GD ------------------------   */}
                  <Route path="/algorithms/gd1" element={<GD1 />} />
                  <Route path="/algorithms/gd2" element={<GD2 />} />
                  <Route path="/algorithms/gd3" element={<GD3 />} />
                  <Route path="/algorithms/gd4" element={<GD4 />} />
                  <Route path="/algorithms/gd5" element={<GD5 />} />
                  <Route path="/algorithms/gd6" element={<GD6 />} />
                  <Route path="/algorithms/gd7" element={<GD7 />} />
                  <Route path="/algorithms/gd8" element={<GD8 />} />

                  {/* // ------------------------ Linear regression ------------------------   */}
                  <Route path="/algorithms/lr1" element={<LR1 />} />
                  <Route path="/algorithms/lr2" element={<LR2 />} />
                  <Route path="/algorithms/lr3" element={<LR3 />} />
                  <Route path="/algorithms/lr4" element={<LR4 />} />
                  <Route path="/algorithms/lr5" element={<LR5 />} />
                  <Route path="/algorithms/lr6" element={<LR6 />} />

                  {/* // ------------------------ Logistic regression ------------------------   */}
                  <Route path="/algorithms/logreg1" element={<LogReg1 />} />
                  <Route path="/algorithms/logreg2" element={<LogReg2 />} />
                  <Route path="/algorithms/logreg3" element={<LogReg3 />} />
                  <Route path="/algorithms/logreg4" element={<LogReg4 />} />
                  <Route path="/algorithms/logreg5" element={<LogReg5 />} />
                  <Route path="/algorithms/logreg6" element={<LogReg6 />} />
                  <Route path="/algorithms/logreg7" element={<LogReg7 />} />

                  {/* // ------------------------ Neural Network ------------------------  */}
                  <Route path="/algorithms/nn1" element={<NN1 />} />
                  <Route path="/algorithms/nn2" element={<NN2 />} />
                  <Route path="/algorithms/nn3" element={<NN3 />} />

                  <Route path="/signin" element={<SignIn />} />
                </Routes>
              </Box>
            </Suspense>
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;
