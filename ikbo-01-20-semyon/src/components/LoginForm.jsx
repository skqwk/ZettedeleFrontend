import React, {useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import AuthService from "../API/AuthService";
import {useDispatch} from "react-redux";
import {loginAction} from "../store/authReducer";

const LoginForm = ({close}) => {
    const [form, setForm] = useState({login: '', password: ''});
    const dispatch = useDispatch();

    const sendLoginRequest = () => {
        AuthService.auth(form.login, form.password)
            .then(rs => {
                if (rs.status === 200) {
                    dispatch(loginAction(rs.data))
                    close();
                } else {

                }
            })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Input inputName="ЛОГИН" value={form.login} onChange={e => setForm({...form, login: e.target.value})}/>
            <Input inputName="ПАРОЛЬ" type={'password'} value={form.password}
                   onChange={e => setForm({...form, password: e.target.value})}/>
            <Button onClick={() => sendLoginRequest()}>ВОЙТИ</Button>
        </div>
    );
};

export default LoginForm;