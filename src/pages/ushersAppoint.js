import React, { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { observer } from "mobx-react-lite";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";


const UshersAppoint = observer(() => {

    const [managerName, setManagerName] = useState()
    const [managerEmail, setManagerEmail] = useState()
    const navigate = useNavigate()
    const [listUshers, setlistUshers] = useState([])
    const params = useParams()

    const getUshers = async () => {
        console.log('info')
        let ushers = await AuthServices.getUshers()
        console.log('info')
        setlistUshers(ushers)
    }

    const appointUsher = async (usher) => {
        console.log('sfasfafffffffffffffffff')
        Swal.fire({
            title: `Назначить сотрудника : ${usher.email}`,
            text: `${usher.lastName} ${usher.firstName} ${usher.surname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да!'
        }).then(async (result) => {
            if(!result.isConfirmed)
                return
                console.log(params.id)
                console.log(usher.id)
            const res = await AuthServices.appointUsher(params.id, usher.id)
            console.log(res)
            
            if(!(res.status === 200))
                return
    
            Swal.fire(
            'Успех!',
            'Сотрудник назначен',
            'success'
            )
            
        }).catch((err)=> {
            console.log(err)
        })
        
    }

    
    useEffect(() => {
        getUshers();
    }, [])
    
    return(
        <div>

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
                                <a  class="list-group-item list-group-item-action" >
                                    <div className="col-md-9 m-2" onClick={() => appointUsher(usher)}>
                                        <div className="" >ФИО: {usher.lastName} {usher.firstName} {usher.surname}</div>
                                        <div className="mt-1" >Почта: {usher.email} {usher.id}</div>
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

export default UshersAppoint

