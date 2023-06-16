import React, { useEffect, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Events from "./events";
import Categories from "./categories";
import EventUshers from "./eventUshers";


const Event = observer(() =>{
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const params = useParams()
    const navigate = useNavigate()
    const getEvent = async () =>{
        console.log(params.id)
        let event = await AuthServices.getEvent(params.id)
        setName(event.name)
        setDescription(event.description)
        setStartTime(event.start_time)
        setEndTime(event.end_time)
        console.log(event)
    }


    const changeEvent = async () =>{
        try {

            if(!(0 <name.trim().length && name.trim().length < 32) ){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано названия",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }
            console.log(description.trim().length)
            if(!(0 < description.trim().length)){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано описание",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }
            console.log(!startTime)
            if(Date.parse(startTime) > Date.parse(endTime) || !startTime || !endTime){
                Swal.fire({
                    icon: 'error',
                    text: "Некорректно задано время",
                    confirmButtonColor: '#33b5e5'
                })
                return
            }
            const status = await AuthServices.changeEvent(name, description, startTime, endTime, params.id)
            console.log(status)

            Swal.fire({
                icon: 'success',
                text: "Изменено",
                confirmButtonColor: '#33b5e5'
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const deletEvent = async () =>{
        Swal.fire({
            title: 'Вы уверены?',
            text: "Все данные будут безвозвратно утеряны",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да!'
        }).then(async (result) => {
            if(!result.isConfirmed)
                return
                console.log(params.id)
            const res = await AuthServices.deleteEvent(params.id)
            console.log(res)
            
            if(!(res.status === 200))
                return
    
            Swal.fire(
            'Удалено!',
            'Мероприятие удалён.',
            'success'
            )
            navigate('/events')
        })   
    }

    useEffect(() =>{
        getEvent()
    },[])    
    return(
        <div 
        className=" container-fluid">
            <Container className="container-fluid">
            <Form className="container-fluid">
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
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label">Описание</label>
                        <div class="col-sm-8">
                            <textarea
                            placeholder="Введите описание"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="form-control " rows={7}></textarea>
                        </div>
                </div>
                <div class="mt-4 mb-4 row">
                        <label for="inputPassword" class="fs-5 col-sm-1 col-form-label text-end">Начало:</label>
                        <div class="col-sm-3">
                            <input className="form-control "
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                type="datetime-local"
                                name="partydate"/>
                        </div>
                        <label for="inputPassword" class="fs-5 col-sm-2 col-form-label text-end">Конец:</label>
                        <div class="col-sm-3">
                            <input className="form-control "
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                type="datetime-local"
                                name="partydate"/>
                        </div>
                </div>
                    <Button 
                        className="btn btn-info fs-5 me-2 m-2 text-light" 
                        onClick={changeEvent}>
                        Изменить
                    </Button>
                    <Button 
                        className="btn btn-danger fs-5 me-2 m-2" 
                        onClick={deletEvent}>
                        Удалить
                    </Button>
                </Form>
            </Container>
            <hr></hr>
            <div className="container-fluid ">
            
                <Categories />
            </div>
            <hr className="mt-5"></hr>
            <div className="container-fluid">
                <EventUshers />
            </div>
        </div>
    )
})

export default Event