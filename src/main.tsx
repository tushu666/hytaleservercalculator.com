import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';
import App from './App.tsx'

// Check if we are in a browser environment and if root exists
const rootElement = document.getElementById('root');
if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // Hydrate if there is content (SSG/SSR)
    ReactDOM.hydrateRoot(rootElement, 
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </React.StrictMode>
    )
  } else {
    // Render normally if empty (CSR / Dev mode)
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </React.StrictMode>
    )
  }
}
