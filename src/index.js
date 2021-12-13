import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalContextProvider from './GlobalContext';

ReactDOM.render(
    <GlobalContextProvider subPages={(<App/>)}/>,
  document.getElementById('root')
);

