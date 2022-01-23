import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { I18nextProvider , initReactI18next } from 'react-i18next';
import i18next from "i18next";

import translationsEn from './translations/translationsEn.json';
import translationsHe from './translations/translationsHe.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEn },
      he: { translation: translationsHe },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {escapeValue: false},
  });


ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />,
  </I18nextProvider>,
  document.getElementById('root')
);
