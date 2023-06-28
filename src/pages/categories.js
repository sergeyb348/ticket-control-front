import React, { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import Swal from "sweetalert2";

const Categories = observer(() => {

    const [managerName, setManagerName] = useState()
    const [managerEmail, setManagerEmail] = useState()
    const navigate = useNavigate()
    const [listСategory, setlistСategory] = useState([])
    const params = useParams()

    const getСategory = async () => {
        console.log(params.id)
        let categor = await AuthServices.getСategory(params.id)
        console.log(categor)
        setlistСategory(categor)
    }

    

    useEffect(() => {
        getСategory();
    }, [])
    
    return(
       
        
            
            <div class="container " style={ {height: '60vh'}}>
                <p class="d-flex justify-content-center fs-3">Билеты</p>
                
                <div  class="row ">
                    <ol class="list-group list-group-numbered">
                        <ul class="m-4 list-group list-group-flush  overflow-auto" style={ {height: '40vh'}}>
                            {
                            listСategory.map((c) => (
                                    <li  className="list-group-item list-group-item-action border" >
                                                <div onClick={()=>navigate(`/ticket/new/${c.id}`)} className="col-md-9 m-2" >
                                                    <div className="fs-5">Категория: {c.name}</div>
                                                    <div className="mt-1">Количество билетов: {c.number}</div>
                                                    <div className="mt-1">Активированные билеты: {c.count_activ}</div>
                                                    <div className="mt-1">Не активированные: {c.count_inactiv}</div>
                                                </div>
                                    </li>
                            ))
                        }
                        {listСategory.length === 0 ?
                            <div class='d-flex justify-content-center fs-3' style={{paddingTop: "15vh"}}>
                            Добавьте категорию
                            </div>
                            : <></>}
                        
                        </ul>
                    </ol>
                </div>
                
                <Button 
                        className="col-md-4 mt-3 mb-3 text-light nav-link btn-info btn container pt-1 pb-1 fs-5 text-light" 
                        onClick={()=>navigate(`/categ/new/${params.id}`)}>
                            Добавить категорию билетов
                        </Button>
            </div>
        
    );
    
    
});

export default Categories