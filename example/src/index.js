import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Localizer from 'simple-localizer';

import my_localizations from './lang';

ReactDOM.render(
  <React.StrictMode>
    <Localizer languages={my_localizations} default="en" showKeys debug>
      <App />
    </Localizer>
  </React.StrictMode>,
  document.getElementById('root')
);
