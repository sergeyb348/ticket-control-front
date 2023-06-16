import React, { useState, useContext } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Context } from "../index";

let startApp = true



const ChangeManager = () =>{
    const navigate = useNavigate()    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordSecond, setPasswordSecond] = useState('')
    const manager = useContext(Context)

    const getManagerInfo = async () =>{
        
        let token = await AuthServices.auth()
        if(token === 401){
            localStorage.removeItem('token')
            navigate('/login')
        }        
        let managerObject = await AuthServices.get()
        if(managerObject === 401)
            navigate('/login')  
        
        if(startApp){
            startApp = false
            setEmail(managerObject.data.email)
            setName(managerObject.data.name)
        }
    }

    getManagerInfo()

    const update = async () =>{   
        if(!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) && !(email.trim().length === 0)){
            Swal.fire({
                icon: 'error',
                text: "Не верный формат email",
                confirmButtonColor: '#33b5e5'
            })
            return
        }

        if(!name.match(/^[a-zA-Z\-]+$/) && !(name.trim().length === 0)){
            Swal.fire({
                icon: 'error',
                text: "Не верный формат логина",
                confirmButtonColor: '#33b5e5'
            })
            return
        }

        if(!(passwordSecond.trim().length >= 6) && !(passwordSecond.trim().length === 0)){
            Swal.fire({
                icon: 'error',
                text: "Не верный формат пароля",
                confirmButtonColor: '#33b5e5'
            })
            return
        }
        
        let token = await AuthServices.changeManager(email, name, password, passwordSecond)
        if(token.status === 400) {
            Swal.fire({
                icon: 'error',
                text: token.msg,
                confirmButtonColor: '#33b5e5'
            })
            return
        }
        Swal.fire({
            icon:  'success',
            text: "Успех",
            confirmButtonColor: '#33b5e5'
        })
    }

    const deleteManager = async () =>{
        Swal.fire({
            title: 'Вы уверены?',
            text: "Все данные будут безвозвратно утеряны",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'да!'
        }).then(async (result) => {
            if(!result.isConfirmed)
                return
            const res = await AuthServices.deleteManager(password)
            console.log(res)
            
            if(!(res.status === 200)){
                Swal.fire(
                    'Ошибка!',
                    'введите пароль!',
                    'error'
                    )
                return
            }
                
    
            Swal.fire(
            'Удалено!',
            'Аккаунт удалён.',
            'success'
            )
            localStorage.removeItem("token");
            manager.setAuth(false);
            navigate('login')
            navigate('/home')
        })
    }

    return(
        <Container 
        className="d-flex justify-content-center align-items-center "
        style={{height: window.innerHeight -54}}>
            <Card style={{width: 500}} className="p-5 border border-1 border-info">
                <h2 className="m-auto">Ваши данные</h2>
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
                        pattern="[a-z]{4,8}"
                        placeholder="Введите старый пароль" 
                        className="mt-4"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>

                    <Form.Control 
                        placeholder="Введите новый пароль" 
                        className="mt-4"
                        type="password"
                        value={passwordSecond}
                        onChange={ e => setPasswordSecond(e.target.value)}/>
                        <span class="validity"></span>

                    <Button 
                        className="btn btn-info me-2 mt-4" 
                        onClick={update}>
                            Изменить
                        </Button>

                    <Button 
                        className="btn btn-danger me-2 mt-4" 
                        onClick={deleteManager}>
                            Удалить аккаунт
                        </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default ChangeManager