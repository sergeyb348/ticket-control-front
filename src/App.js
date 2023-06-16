import React, { useContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Context} from './index'


const App = () => {
  let checkAuth = localStorage.getItem('token') ? true : false
  const [auth, setAuth]  = useState(checkAuth)
  const manager = useContext(Context)
  manager.auth = auth;
  manager.setAuth = setAuth;

  
  return (
    <BrowserRouter>
     <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
