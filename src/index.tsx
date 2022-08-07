import React from 'react';
import { createRoot } from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { ROOT_ELEMENT_ID } from './config/constants';
import App from './containers/App/App';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
