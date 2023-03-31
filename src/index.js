import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './fonts/gilroy/Gilroy-Regular.ttf';

import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
setTimeout(() => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}, 1500);
