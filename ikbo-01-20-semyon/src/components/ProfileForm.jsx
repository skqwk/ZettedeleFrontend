import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import {logoutAction} from "../store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {UserService} from "../API/UserService";

const ProfileForm = () => {
    const [profile, setProfile] = useState({login: '', lastAuth: ''});

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const logout = () => {
        console.log('Logout');
        dispatch(logoutAction());
    }

    useEffect(() => {
        if (auth.isAuth) {
            UserService.getProfile(auth.authToken)
                .then(rs => {
                    console.log(rs.data);
                    setProfile({...profile, ...rs.data})
                })
        }
    }, [auth])

    return (
        <div style={{width: "100%", alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <Input inputName="ЛОГИН" readOnly value={profile.login}/>
            <Input inputName="ПОСЛЕДНЯЯ АВТОРИЗАЦИЯ" readOnly value={profile.lastAuth}/>
            <Button onClick={() => logout()}>ВЫЙТИ</Button>
        </div>
    );
};

export default ProfileForm;