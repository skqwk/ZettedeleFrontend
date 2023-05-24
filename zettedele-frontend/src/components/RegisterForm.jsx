import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import AuthService from "../API/AuthService";
import {isBlank} from "../utils/ValidationUtil";
import Alert from "./UI/alert/Alert";

const RegisterForm = ({visible, close}) => {
    const [form, setForm] = useState({login: '', password: '', repeatedPassword: ''});
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const register = () => {
        AuthService.register(form.login, form.password)
            .then(rs => {
                console.log(rs);
                close();
            })
            .catch(e => {
                console.log(e.response);
                if (e.response.status === 409) {
                    setAlertMessage(e.response.data.message);
                    setTimeout(() => {
                        setAlertMessage(null)
                    }, 10000);
                }
            });
    }

    const isNotValid = () => {
        return isBlank(form.login)
            || isBlank(form.password)
            || isBlank(form.repeatedPassword)
            || form.password !== form.repeatedPassword;
    }

    useEffect(() => {
        setForm({login: '', password: '', repeatedPassword: ''})
        setAlertMessage(null);
    }, [visible])

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            {alertMessage && <Alert>{alertMessage}</Alert>}
            <Input inputName="ЛОГИН" value={form.login} onChange={e => setForm({...form, login: e.target.value})}/>
            <Input inputName="ПАРОЛЬ" type={'password'} value={form.password}
                   onChange={e => setForm({...form, password: e.target.value})}/>
            <Input inputName="ПОВТОРИТЕ ПАРОЛЬ" type={'password'} value={form.repeatedPassword}
                   onChange={e => setForm({...form, repeatedPassword: e.target.value})}/>
            <Button onClick={register} disabled={isNotValid()}>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </div>
    );
};

export default RegisterForm;