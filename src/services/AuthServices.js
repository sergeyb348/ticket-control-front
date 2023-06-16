import $api from "../http";
import { AxiosResponse } from "axios";

export default class AuthServices{
    static async login(email, password) {
        return $api.post('manager/login', {
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async registration(name, email, password) {
        return $api.post('manager/registration', {
            name,
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async addEvents(name, description, start_time, end_time) {
        return $api.post('manager/event', {
            name,
            description,
            start_time,
            end_time
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async changeEvent(name, description, start_time, end_time, eventId) {
        return $api.patch('manager/event', {
            name,
            description,
            start_time,
            end_time,
            eventId
        })
        .then(res => {
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async addUsher(email, firstName, lastName, surname, password) {
        return $api.post('usher/registration', {
            email,
            firstName,
            lastName,
            surname,
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async getEvent(id) {
        console.log(id)
        return $api.get(`manager/event/${id}`, {
        })
        .then(res => {
            
            let event = res.data
            event.start_time = new Date(Date.parse(event.start_time))
            event.end_time = new Date(Date.parse(event.end_time))
            return event
        })
        .catch(err =>{
            console.log(err)
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async auth() {
        return $api.get('manager/auth')
        .then(res => res)
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return err.response.status
        }) 
    }

    static async get() {
        return $api.get('manager')
        .then(res => res )
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return err.response.status
        })
    }

    static async getEvents() {
        return $api.get('manager/events')
        .then(res => res.data.map(event => {
            event.start_time = new Date(Date.parse(event.start_time))
            event.end_time = new Date(Date.parse(event.end_time))
            console.log(event)
            return event
        }))
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return err.response.status
        })
    }

    static async getСategory(id) {
        return $api.get(`manager/categories/${id}`)
        .then(res => res.data.map(cat => {
            return cat
        }))
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return err.response.status
        })
    }

    static async getUshers() {
        return $api.get('manager/ushers')
        .then(res => res.data.map(u => {
            console.log(u)
            return u
        }))
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return err.response.status
        })
    }

    static async getUsherEvent(eventId) {
        return $api.get(`manager/event/ushers/${eventId}`)
        .then(res => res.data.map(u => {
            console.log(u)
            return u
        }))
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return err.response.status
        })
    }

    static async getUsher(id) {
        console.log(id)
        return $api.get(`/manager/usher/${id}`, {
        })
        .then(res => {
            
            let usher = res.data
            console.log(usher)
            return usher
        })
        .catch(err =>{
            console.log(err)
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async changeManager(newEmail, newName, password, newPassword){
        return $api.patch('manager', {
            newEmail,
            newName,
            password,
            newPassword
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err => {
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async addTicket(categId, email, description) {
        return $api.post('manager/ticket', {
            categId,
            email,
            description
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async addCateg(name, number, eventId) {
        return $api.post('manager/category', {
            name,
            number,
            eventId
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async deleteUsher(usherId) {
        return $api.post('/usher/delete',{
            usherId
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async deleteManager(password) {
        return $api.post('/manager/delete',{
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async deleteEvent(eventId) {
        return $api.post('/manager/event/delete',{
            eventId
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async appointUsher(eventId, usherId) {
        return $api.post('/manager/appoint',{
            eventId,
            usherId
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            console.log(err)
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }

    static async removeFromEvent(eventId, usherId) {
        return $api.post('/manager/event/remove',{
            eventId,
            usherId
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            return {status: res.status}
        })
        .catch(err =>{
            console.log(err)
            if(err.response.status === 401)
                localStorage.removeItem('token')
            return { status: err.response.status, msg: err.response.data.message.errors[0].msg  }
        })
    }
}