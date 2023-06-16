import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const NewTicket = observer(() =>{
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const params = useParams()

    const addTicket = async () =>{
        try {
            if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задана почта",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            if(!(description.length > 0)){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано описание",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }
            console.log('addT')
            console.log(params.id)
            const resBd = await AuthServices.addTicket(params.id, email, description)
            Swal.fire({
                icon: 'success',
                text: "Билет отправлен",
                confirmButtonColor: '#33b5e5'
            })
            console.log(resBd)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container 
        className=" ">
            <Form className="container">
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Почта получателя</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите почту"
                                className=" form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Описание</label>
                        <div class="col-sm-8">
                        <textarea
                            placeholder="Введите описание"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="form-control " rows={7}></textarea>
                        </div>
                </div>
                    <Button 
                        className="btn btn-info fs-5 me-2 mt-4 text-light" 
                        onClick={addTicket}>
                            Отправить
                        </Button>
                </Form>
        </Container>
    )
})

export default NewTicket