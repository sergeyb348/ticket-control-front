import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
const Register = () =>{
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordSecond, setPasswordSecond] = useState('')
    const signIn = async () =>{
        try {
            const res = await AuthServices.registration(name,email,password)
            if(res.status === 400){
                Swal.fire({
                  icon: 'error',
                  text: res.msg,
                  confirmButtonColor: '#33b5e5'
                })
                return
              }
              Swal.fire({
                icon:  'success',
                text: "Успех",
                confirmButtonColor: '#33b5e5'
            })
        navigate('/login')
        } catch (error) {
        }
    }
    return(
        <Container 
        className="d-flex justify-content-center align-items-center "
        style={{height: window.innerHeight -54}}>
            <Card style={{width: 500}} className="p-5 border border-1 border-info">
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        placeholder="Введите email"
                        className="mt-4"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>

                    <Form.Control 
                        placeholder="Введите Имя" 
                        className="mt-4"
                        value={name}
                        onChange={e => setName(e.target.value)}/>

                    <Form.Control 
                        placeholder="Введите пароль" 
                        className="mt-4"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>

                    <Form.Control 
                        placeholder="Введите пароль" 
                        className="mt-4"
                        type="password"
                        value={passwordSecond}
                        onChange={ e => setPasswordSecond(e.target.value)}/>
                    <Button 
                        className="btn btn-info me-2 mt-4 text-light" 
                        onClick={signIn}>
                            Регистрация
                        </Button>
                </Form>
            </Card>
        </Container>
    )
}
export default Register