import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import './index.module.scss';

const app = <BrowserRouter basename='/burger-builder/'>
              <App />
            </BrowserRouter>

ReactDOM.render(app, document.getElementById('root'));
//固定变量app并不在jsx中,所以普通变量的写法.

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
