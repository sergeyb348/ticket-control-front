import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Swal from "sweetalert2";
import { observer } from "mobx-react-lite";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";


const NewEvents = observer(() =>{
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const navigate = useNavigate()

    const addEvent = async () =>{
        try {
            console.log(name.trim().length)
            if(!(0 <name.trim().length < 32) ){
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
                    text: "Некорректно задано названия",
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
            const status = await AuthServices.addEvents(name, description, startTime, endTime)
            console.log(status)
            Swal.fire({
                icon: 'success',
                text: "Мероприятие создано",
                confirmButtonColor: '#33b5e5'
            })
            navigate('/events')
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
                        className="btn btn-info fs-5 me-2 mt-4 text-light" 
                        onClick={addEvent}>
                            добавить
                        </Button>
                </Form>
        </Container>
    )
})

export default NewEvents