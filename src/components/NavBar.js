import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../index";





const NavBar = observer(() => {
    const manager = useContext(Context)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        manager.setAuth(false);
        navigate('login')
        console.log('/login')
    };

    


  return (
    <nav className="navbar navbar-expand-lg bg-info sticky-top">
      <div className="container-fluid ">
        <Link className="navbar-brand text-light" to="/home">
          Ticket-control
        </Link>
        <button class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#myNavigation"
          aria-controls="myNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        
        {manager.auth ? (
          <div className="collapse navbar-collapse" id="myNavigation">
            <div className="navbar-nav">
              
                
                <div className="nav-item ">
                    <NavLink
                    className=" text-light nav-item active nav-link text-secondary"
                    activeClassName="active"
                    to="/events"
                    >
                        Мероприятия 
                    </NavLink>
                </div>
                <div className="nav-item">
                    <NavLink 
                      className=" text-light nav-link text-secondary"
                      activeClassName="active"
                      to="/ushers"
                    >
                        Сотрудники
                    </NavLink>
                </div>

            </div>
          </div>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item container px-2">
              <Link
                className="text-light nav-link btn btn-outline-light"
                to="login"
              >
                Войти
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className=" text-light nav-link btn btn-outline-light container px-2"
                to="/register"
              >
                Регистрация
              </Link>
            </li>
          </ul>
        )}
        {manager.auth ? (
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link 
                    className="text-light nav-link btn btn-outline-light"
                    activeClassName="active"
                    to = "login"
                    onClick={handleLogout}>
                        Выйти
                </Link>
            </li>
          </ul>
        ): (<></>)}
      </div>
    </nav>
  );
});

export default NavBar;
