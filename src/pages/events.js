import React, { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

const Events = observer(() => {

    const [managerName, setManagerName] = useState()
    const [managerEmail, setManagerEmail] = useState()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [listEvents, setlistEvents] = useState([])
    
    const getManagerInfo = async () =>{
        let managerObject = await AuthServices.get()
        if(managerObject === 401)
            navigate('/login')
        console.log(managerObject.data.email) 
        console.log(managerObject.data.name) 
        setManagerEmail(managerObject.data.email)
        setManagerName(managerObject.data.name)
        
    }

    const getEvents = async () => {
        let events = await AuthServices.getEvents()
        events.sort()
        setlistEvents(events)
    }

    useEffect(() => {
        getManagerInfo();
        getEvents();
    }, [])

    let filterListEvent = listEvents.filter(e =>
        {console.log(search.toLowerCase())
        return e.name.toLowerCase().includes(search.toLowerCase())}
    )
    
    return(
        <div  className="">
            <div className="row py-3 py-1 px-4 bg-secondary">
                <div className="text-light col-md-8 fs-5"> {managerName}</div>
                <div className="text-light col-md-2 text-end "> {managerEmail}</div>
                <Link
                className="text-secondary col-md-2 nav-link btn-info btn container"
                to="/manager"
                >
                Редактироватьs
              </Link>
            </div>
            <div >
                <Form.Control
                        placeholder="Поиск"
                        className="mt-4 mb-4"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value)
                        }}/>
                <Link
                className="col-md-4 mb-3 text-light nav-link btn-info btn container pt-1 pb-1 fs-5 fixed-bottom text-light"
                to="/events/new"
                >
                Создать новое мероприятие
              </Link>
                {filterListEvent.length === 0 ? 
                <div class='d-flex justify-content-center fs-3' style={{paddingTop: "30vh"}}>
                    Добавьте мероприятие
                </div>:
                <ol class="list-group list-group-numbered">
                    <ul class=" list-group list-group-flush h-90 overflow-auto" >
                        {
                        filterListEvent.map((event) =>{
                            console.log(event.status)
                            let imgStatus = 'wait'
                            if(event.status === 'activ')
                                imgStatus = 'activ'
                            if(event.status === 'end')
                                imgStatus = 'end'
                            return (
                                <li className="" onClick={() => navigate(`/event/${event.id}`)}>
                                        <a class="list-group-item list-group-item-action row">
                                        <img className=" m-2" src={require(`../style/${imgStatus}.png`)} align="right" style={{height: "100px", width:"125px",  }} />
                                        <div className="fs-5 mb-2">{event.name}</div>
                                        
                                        <div >
                                            <div className=" m-2"  style={{display:"inline-block", overflow:'hidden'}}  >
                                                <div className="fs-6 mt-1">Начало: {event.start_time.toLocaleDateString('ru-RU',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} в {event.start_time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </div>
                                                <div className=" fs-6 mt-1"> Конец: {event.end_time.toLocaleDateString('ru-RU',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} в {event.end_time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                                            </div>
                                            
                                        </div>  
                                        </a>
                                    
                                </li>
                        )
                        } )
                    }
                    </ul>
                </ol>}
            </div>
            
            <div className="row py-3 py-1 px-4 sticky-bottom">
                <div className="text-light col-md-9 fs-5"></div>
                
            </div>
            <div className=""></div>
        </div>
    );
    
    
});

export default Events