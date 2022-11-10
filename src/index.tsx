import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@app/App';
import reportWebVitals from '@app/reportWebVitals';
import { store } from '@app/stores/store';

import '@fontsource/sora';
import '@fontsource/montserrat';

import '@app/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
