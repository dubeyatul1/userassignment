import React from 'react';
import ReactDOM from 'react-dom'; 
import configureStore  from "./store/ConfigureStore";
import { Provider } from 'react-redux';  
import AppRouter from './router/router';
/* Bootstrap core CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; 

import './index.css';

const store = configureStore();
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );

ReactDOM.render(jsx, document.getElementById('root'));
