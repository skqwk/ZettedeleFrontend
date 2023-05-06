import React, {useEffect, useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import {logoutAction} from "../store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {UserService} from "../API/UserService";
import Switch from "./UI/switch/Switch";
import {useVisibility} from "../hooks/useVisibility";

const ProfileForm = () => {
    const [visibility, setVisibility] = useState(false);
    const [profile, setProfile] = useState({login: '', lastAuth: ''});
    const authToken = useSelector(state => state.auth.authToken);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const logout = () => {
        console.log('Logout');
        dispatch(logoutAction())
        localStorage.removeItem("nodeId");
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
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


    const toggle = (e) => {
        const isVisible = e.target.checked;
        UserService.changeVisibility(authToken, isVisible)
            .then(rs => {
                if (rs.status === 200) {
                    setVisibility(isVisible);
                }
            })
    }

    useVisibility(authToken, setVisibility);


    return (
        <div style={{width: "100%", alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <Input inputName="ЛОГИН" readOnly value={profile.login}/>
            <Input inputName="ПОСЛЕДНЯЯ АВТОРИЗАЦИЯ" readOnly value={profile.lastAuth}/>
            <Switch switchName={"ВИДИМОСТЬ"} checked={visibility} onToggle={toggle}/>
            <Button onClick={() => logout()}>ВЫЙТИ</Button>
        </div>
    );
};

export default ProfileForm;