import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ManagerStore from './store/MnangerStore';
console.log(localStorage.getItem('token'));
const manager = new ManagerStore();
export const Context = createContext(null);
ReactDOM.render(
  <Context.Provider value={manager}>
    <App/>
  </Context.Provider>,
  document.getElementById('root')
);
