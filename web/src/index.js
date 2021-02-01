// vendor imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// import { Provider } from 'react-redux';
// components
import App from './App';
// redux store
// import store from 'redux/store';

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  // </Provider>,
  document.getElementById('root')
);