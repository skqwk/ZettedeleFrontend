import React, {useState} from 'react';
import Button from "./UI/button/Button";
import {useSelector} from "react-redux";
import Hint from "./UI/hint/Hint";
import Modal from "./UI/modal/Modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthForm = () => {
    const offline = useSelector(state => state.connection.offline);
    const [registerForm, setRegisterForm] = useState(false);
    const [loginForm, setLoginForm] = useState(false);

    const login = () => {
        console.log('Login');
        setLoginForm(true);
    }

    const register = () => {
        console.log('Register');
        setRegisterForm(true);
    }

    const closeRegisterForm = () => {setRegisterForm(false)};
    const closeLoginForm = () => {setLoginForm(false)};

    return (
        <div style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
        }}>
            <Modal visible={registerForm} setVisible={setRegisterForm} close={closeRegisterForm}>
                <RegisterForm visible={registerForm} close={closeRegisterForm}/>
            </Modal>
            <Modal visible={loginForm} setVisible={setLoginForm} close={closeLoginForm}>
                <LoginForm visible={loginForm} close={closeLoginForm}/>
            </Modal>

            {offline && <Hint>Восстановите подключение к сети, чтобы иметь возможность авторизоваться</Hint>}
            <Button onClick={() => login()} disabled={offline}>АВТОРИЗОВАТЬСЯ</Button>
            <Button onClick={() => register()} disabled={offline}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </div>
    );
};

export default AuthForm;