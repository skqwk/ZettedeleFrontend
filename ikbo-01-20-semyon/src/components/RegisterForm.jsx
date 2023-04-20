import React, {useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";

const RegisterForm = () => {
    const [form, setForm] = useState({login: '', password: '', repeatedPassword: ''});

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Input inputName="ЛОГИН" value={form.login} onChange={e => setForm({...form, login: e.target.value})}/>
            <Input inputName="ПАРОЛЬ" type={'password'}  value={form.password}
                   onChange={e => setForm({...form, password: e.target.value})}/>
            <Input inputName="ПОВТОРИТЕ ПАРОЛЬ" type={'password'} value={form.repeatedPassword}
                   onChange={e => setForm({...form, repeatedPassword: e.target.value})}/>
            <Button>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </div>
    );
};

export default RegisterForm;