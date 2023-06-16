import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const NewCategory = observer(() =>{
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const navigate = useNavigate()
    const params = useParams()

    const addCateg = async () =>{
        try {
            if(!(0 < name.trim().length && name.trim().length < 32)){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано названия",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            console.log(Number(number))
            if(!(0 < Number(number) &&  Number(number) < 9999999) ){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано количество билетов",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            const res = await AuthServices.addCateg(name, number, params.id)
            console.log(res)
            
            navigate(`/event/${params.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container 
        className=" ">
            <Form className="container">
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Название</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите название"
                                className=" form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}/>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Количество билетов</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите количество билетов"
                                className=" form-control"
                                type="number"
                                min="0" step="1"
                                value={number}
                                onChange={e => setNumber(e.target.value)}/>
                        </div>
                </div>
                    <Button 
                        className="btn btn-info fs-5 me-2 mt-4 text-light" 
                        onClick={addCateg}>
                            добавить
                        </Button>
                </Form>
        </Container>
    )
})

export default NewCategory