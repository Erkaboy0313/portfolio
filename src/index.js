import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './main.scss';

import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import uz from "./locales/uz/translations.json";
import ru from "./locales/ru/translations.json";
import en from "./locales/en/translations.json";


i18next.use(initReactI18next).init({
    resources: {
        uz: {
            translation: uz,
        },
        ru: {
            translation: ru,
        },
        en: {
            translation: en,
        },
    },
    lng: localStorage.getItem("lng") || "uz",
});

export default i18next;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
