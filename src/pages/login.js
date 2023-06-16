import React, { useContext, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import { observer } from "mobx-react-lite";
import {Context} from '../index'
import Swal from "sweetalert2";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const manager = useContext(Context)

  const signIn = async () => {
    try {
      const res = await AuthServices.login(email, password);
      if(res.status === 400){
        Swal.fire({
          icon: 'error',
          text: res.msg,
          confirmButtonColor: '#33b5e5'
        })
        return
      }
        
      manager.setAuth(true)
      navigate("/home"); // Navigate to the home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
    className="d-flex justify-content-center align-items-center "
    style={{height: window.innerHeight -54}}>
      <Card style={{ width: 500 }} className="p-5 border border-1 border-info">
          <Form className="d-flex flex-column">
          <h2 className="m-auto">Авторизация</h2>
            <Form.Control
                        placeholder="Введите email"
                        className="mt-4"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>

              <Form.Control 
                        placeholder="Введите пароль" 
                        className="mt-4"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>

            <Button onClick={signIn} className="btn btn-info me-2 mt-4 text-light">
              Войти
            </Button>
          </Form>
      </Card>
    </Container>
  );
});

export default Login;
