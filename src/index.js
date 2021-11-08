import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import moment from 'moment';
import 'moment/locale/es-mx'
import '@fontsource/roboto';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

moment.locale('es-mx');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
