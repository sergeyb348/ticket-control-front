import React, { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import Swal from "sweetalert2";

const EventUshers = observer(() => {

    const [managerName, setManagerName] = useState()
    const [managerEmail, setManagerEmail] = useState()
    const navigate = useNavigate()
    const [listUshers, setlistUshers] = useState([])
    const params = useParams()

    const getUshers = async () => {
        console.log(params.id)
        let categor = await AuthServices.getUsherEvent(params.id)
        console.log(categor)
        setlistUshers(categor)
    }

    

    useEffect(() => {
        getUshers();
    }, [])
    
    return(
       
        
            
            <div class="container mb-5" style={ {height: '60vh'}}>
                <p class="d-flex justify-content-center fs-3 mt-4">Сотрудники</p>
                
                <div  class="row ">
                    <ol class="list-group list-group-numbered">
                        <ul class="m-4 list-group list-group-flush  overflow-auto" style={ {height: '40vh'}}>
                            {
                            listUshers.map((usher) => (
                                <li class="" >
                                    <a  class="list-group-item list-group-item-action" >
                                        <div className="col-md-9 m-2" onClick={() => navigate(`/usher/${usher.id}`)}>
                                        <div className="fs-5" >ФИО: {usher.lastName} {usher.firstName} {usher.surname}</div>
                                        <div className="fs-6 mt-1" >Почта: {usher.email} {usher.id}</div>
                                    </div>
                                    </a>
                                </li>
                            ))
                        }
                        {listUshers.length === 0 ?
                            <div class='d-flex justify-content-center fs-3' style={{paddingTop: "15vh"}}>
                                Назначьте сотрудника
                            </div>
                            : <></>}
                        
                        </ul>
                    </ol>
                </div>
                
                <Button 
                        className="col-md-4 mt-3 mb-3 text-light nav-link btn-info btn container pt-1 pb-1 fs-5 text-light" 
                        onClick={()=>navigate(`/usher/appoint/${params.id}`)}>
                            Назначить сотрудника
                        </Button>
            </div>
        
    );
    
    
});

export default EventUshers