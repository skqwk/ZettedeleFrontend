import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import AuthService from "../API/AuthService";
import {useDispatch} from "react-redux";
import {loginAction} from "../store/authReducer";
import {HLC} from "../core/clock/HLC";
import Alert from "./UI/alert/Alert";
import {isBlank} from "../utils/ValidationUtil";

const LoginForm = ({visible, close}) => {
    const [form, setForm] = useState({login: '', password: ''});
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(false);

    const sendLoginRequest = () => {
        AuthService.auth(form.login, form.password)
            .then(rs => {
                if (rs.status === 200) {
                    console.log(rs.data);
                    dispatch(loginAction(rs.data))
                    localStorage.setItem("role", rs.data.role);
                    localStorage.setItem("authToken", rs.data.authToken);
                    AuthService.getNodeId(rs.data.authToken)
                        .then(rs => {
                            if (rs.status === 200) {
                                HLC.init(rs.data.nodeId)
                                localStorage.setItem("nodeId", rs.data.nodeId);
                            } else {
                                console.log("ERROR DURING INIT HLC");
                                console.log(rs.status);
                            }
                        })

                    close();
                } else {
                    console.log("ERROR DURING LOGIN");
                    console.log(rs.status);
                    console.log(rs);
                }
            })
            .catch(e => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false)
                }, 10000);
            })
    }

    useEffect(() => {
        setForm({login: '', password: ''});
        setAlert(false);
    }, [visible])

    const isNotValid = () => {
        return isBlank(form.login)
            || isBlank(form.password);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '400px'}}>
            {alert && <Alert>Пользователь с данным логином и паролем не найден</Alert>}
            <Input inputName="ЛОГИН" value={form.login} onChange={e => setForm({...form, login: e.target.value})}/>
            <Input inputName="ПАРОЛЬ" type={'password'} value={form.password}
                   onChange={e => setForm({...form, password: e.target.value})}/>
            <Button onClick={() => sendLoginRequest()} disabled={isNotValid()}>ВОЙТИ</Button>
        </div>
    );
};

export default LoginForm;