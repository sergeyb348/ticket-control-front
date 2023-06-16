import React, { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

const Ushers = observer(() => {

    const [managerName, setManagerName] = useState()
    const [managerEmail, setManagerEmail] = useState()
    const navigate = useNavigate()
    const [listUshers, setlistUshers] = useState([])
    
    const getManagerInfo = async () =>{
        let managerObject = await AuthServices.get()
        
        if(managerObject === 401)
            navigate('/login') 
        setManagerEmail(managerObject.data.email)
        setManagerName(managerObject.data.name)
        
    }

    const getUshers = async () => {
        console.log('info')
        let ushers = await AuthServices.getUshers()
        console.log('info')
        setlistUshers(ushers)
    }

    
    useEffect(() => {
        getManagerInfo();
        getUshers();
    }, [])
    
    return(
        <div>
            <div className="row py-3 px-4 bg-secondary" >
                <div className="text-light col-md-8 fs-5"> {managerName}</div>
                <div className="text-light col-md-2 text-end "> {managerEmail}</div>
                <Link
                className="text-secondary col-md-2 nav-link btn-info btn container"
                to="/manager"
                >
                Редактировать
              </Link>
            </div>
            <div className="">
                {listUshers.length === 0 ? 
                <div class='d-flex justify-content-center fs-3' style={{paddingTop: "30vh"}} >
                    Добавьте сотрудника
                </div>:
                <ol class="list-group list-group-numbered">
                    <ul class=" list-group list-group-flush">
                        {
                        listUshers.map((usher) => (
                            <li class="" >
                                <a  class=" row list-group-item list-group-item-action" >
                                    <div className="col-md-6 m-2" onClick={() => navigate(`/usher/${usher.id}`)}>
                                        <div className="fs-5" >ФИО: {usher.lastName} {usher.firstName} {usher.surname}</div>
                                        <div className="fs-6 mt-1" >Почта: {usher.email} {usher.id}</div>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                    </ul>
                </ol>}
            </div>
            <div className="row py-3 px-4 sticky-bottom">
                <div className="text-light col-md-9 fs-5"></div>
                <Link
                className="col-md-4 mb-3 text-light nav-link btn-info btn container pt-1 pb-1 fs-5 fixed-bottom"
                to="/ushers/new"
                >
                Добавить сотрудника
              </Link>
            </div>
        </div>
    );
    
    
});

export default Ushers

