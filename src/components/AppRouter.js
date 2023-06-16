import React, { useContext } from "react";
import {Navigate, Outlet, Route, Router, Routes} from "react-router-dom"
import { authRoutes, publicRoutes } from "../routs";

import Login from "../pages/login"
import Events from "../pages/events"
import Home from "../pages/home"
import Manager from "../pages/manager"
import Register from "../pages/register"
import ChangeManager from "../pages/changeManager";
import NavBar from "./NavBar";
import NewEvents from "../pages/newEvents";
import Event from "../pages/event";
import Ushers from "../pages/ushers";
import NewUsher from "../pages/newUsher";
import Usher from "../pages/usher";
import NewCategory from "../pages/newCategory";
import NewTicket from "../pages/newTicket";
import UshersAppoint from "../pages/ushersAppoint";
import UsherEvent from "../pages/usherEvent";

const AppRouter = () =>{
    console.log()
     
    return(
        
            
        <Routes>   
            <Route path="/home" element={<Home/>}/>
            <Route path="events" element={<Events/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/manager" element={<ChangeManager/>}/>
            <Route path="/events/new" element={<NewEvents/>}/>
            <Route path="/ushers/new" element={<NewUsher/>}/>
            <Route path="/categ/new/:id" element={<NewCategory/>}/>
            <Route path="/event/:id" element={<Event/>} />
            <Route path="/ushers" element={<Ushers/>} />
            <Route path="/usher/:id" element={<Usher/>} />
            <Route path="/event/:eventId/usher/:usherId" element={<UsherEvent/>} />
            <Route path="/ticket/new/:id" element={<NewTicket/>} />
            <Route path="/usher/appoint/:id" element={<UshersAppoint/>} />
        </Routes>

        
    )
}

export default AppRouter