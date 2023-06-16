import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";


const NewUsher = observer(() =>{
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')
    

    const addUsher = async () =>{
        try {
            

            if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задана почта",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }
            
            if(!firstName.match(/^[a-zA-Zа-яА-Я\-]+$/) ){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано имя",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            if(!lastName.match(/^[a-zA-Zа-яА-Я\-]+$/) ){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задана фамилия",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            if(!surname.match(/^[a-zA-Zа-яА-Я\-]+$/) ){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано отчество",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            if(password.length < 6){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано пароль",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }

            const res = await AuthServices.addUsher(email, firstName, lastName, surname, password)

            if(res.status === 400){
                Swal.fire({
                  icon: 'error',
                  text: res.msg,
                  confirmButtonColor: '#33b5e5'
                })
                return
            }

            Swal.fire({
                icon: 'success',
                text: "Сотрудник создан",
                confirmButtonColor: '#33b5e5'
            })
            navigate('/ushers')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container 
        className=" ">
            <Form className="container">
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Почта</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите почту"
                                className=" form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Имя</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите имя"
                                className=" form-control"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}/>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Фамилия</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите фамилию"
                                className=" form-control"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}/>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Отчество</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите отчество"
                                className=" form-control"
                                value={surname}
                                onChange={e => setSurname(e.target.value)}/>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Пароль</label>
                        <div class="col-sm-8">
                            <Form.Control
                                placeholder="Введите пароль "
                                className=" form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                        </div>
                </div>
                
                    <Button 
                        className="btn btn-info fs-5 me-2 mt-4 text-light" 
                        onClick={addUsher}>
                            добавить
                        </Button>
                </Form>
        </Container>
    )
})

export default NewUsher