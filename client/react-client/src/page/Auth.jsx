import React, { useContext, useState } from 'react';
import { Container, Card, Form, Row, Button, InputGroup } from 'react-bootstrap';
import { data, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE,REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../components/axiosHttp/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '../store/context';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Global.css';

const Auth =  observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clickAuth = async () => {
        try {
        let dataUser
        if(isLogin) {
            dataUser = await login(email, password)
        } else {
            dataUser = await registration(email, password)
            }
        user.setEmail(dataUser.email)
        user.setUser(dataUser) 
        user.setRole(dataUser.role)
        user.setAuth(true)
        navigate(SHOP_ROUTE)
        } catch(e) {
            alert(e.response.data.message)
        }
    } 

    return (
        <Container className="auth-container">
          <Card className="auth-card">
            <h2 className="auth-title">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
            <Form className="auth-form">
              <InputGroup className="auth-input-group">
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Введіть ваш email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </InputGroup>
    
              <InputGroup className="auth-input-group">
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Введіть ваш пароль..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </InputGroup>
    
              <Row className="d-flex justify-content-between align-items-center auth-row">
                <div className="col-auto">
                  {isLogin ? (
                    <span>
                      Нема акаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструватися</NavLink>
                    </span>
                  ) : (
                    <span>
                      Є аккаунт? <NavLink to={LOGIN_ROUTE}>Ввійти</NavLink>
                    </span>
                  )}
                </div>
                <div className="col-auto">
                  <Button className="auth-button" onClick={clickAuth}>
                    {isLogin ? 'Ввійти' : 'Реєстрація'}
                  </Button>
                </div>
              </Row>
            </Form>
          </Card>
        </Container>
      );
})

export default Auth;